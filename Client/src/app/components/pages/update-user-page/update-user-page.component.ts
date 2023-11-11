import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AllUsersDataService} from "../../../services/all-users-data.service";
import {ActivatedRoute} from "@angular/router";
import {GetPicturesService} from "../../../services/get-pictures.service";
import {IBanner, IPortraits} from "../../../models/Pictires";
import {HttpClient, HttpEventType} from "@angular/common/http";
import {IUser} from "../../../models/IUser";
import {UploadimagesService} from "../../../services/uploadimages.service";
import {catchError} from "rxjs";

@Component({
  selector: 'app-update-user-page',
  templateUrl: './update-user-page.component.html',
  styleUrls: ['./update-user-page.component.less']
})
export class UpdateUserPageComponent implements OnInit{
  UserId: string | null;
  Portraits: IPortraits[];
  CurrentUser: IUser = {
    fullName: '',
    email: '',
    portraitUrl: '',
    bannerUrl: '',
    userName: '',
    id: '',
    MainRace: '',
    team: ''
  }
  UserName: string;
  selectedFile: File;
  constructor(
    private userDataService: AllUsersDataService,
              private route: ActivatedRoute,
              private getPicturesService : GetPicturesService,
              private http: HttpClient,
              private fileService: UploadimagesService) {
  }
ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.UserId = params.get('id');
    })
  if (this.UserId) {
    this.userDataService.GetOneCurrentOwnerUser(this.UserId).subscribe(currentUser => {
this.CurrentUser = currentUser;
this.UserName = currentUser.userName;
      if (this.UserName.includes(`<${this.CurrentUser.team}>`)) {
        this.UserName =this.UserName.replace(`<${this.CurrentUser.team}>`, '')
      }
      console.log(currentUser);
    });
  }
  // реализуем получение данных из корневого json файла в сервисе
  this.getPicturesService.GetPortraitsJson().subscribe((data: IPortraits[]) => {
    this.Portraits = data;
  });

}
onFileSelected(event: any):void {
        if (event && event.target && event.target.files.length > 0) {
        this.selectedFile = event.target.files[0];
        console.log(this.selectedFile);
        this.onUploadBanner(this.selectedFile)
    }
}
onUploadBanner(file: File):void {
    if (file) {
      this.fileService.uploadUserBannerFile(file).pipe(
        catchError((error) => {
          console.error('Ошибка при загрузке файла:', error);
          return [];
        })
      ).subscribe((uploadedFile: IBanner) => {
        this.loadImage();
      })
    }
}
  loadImage(): void {
    this.fileService.getBannerImage(this.selectedFile.name).subscribe((imageData: Blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Преобразование Blob в base64
        this.CurrentUser.bannerUrl = reader.result as string;
      };
      reader.readAsDataURL(imageData);
    });
  }
  setPortraitImg(portrait: IPortraits) {
this.CurrentUser.portraitUrl = portrait.url;
    console.log(portrait)
  }
  onSubmit() {
    this.CurrentUser.userName = `<${this.CurrentUser.team}>${this.UserName}`;
this.userDataService.UpdateDateOfUser(this.CurrentUser.id, this.CurrentUser).subscribe((updatedUser: IUser) => {
  this.CurrentUser = updatedUser;
})
  }
}

