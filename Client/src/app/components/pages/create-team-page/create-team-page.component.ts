import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ITeam} from "../../../models/teamModel";
import {TeamServiceService} from "../../../services/team-service.service";
import {catchError} from "rxjs";
import {IBanner} from "../../../models/Pictires";
import {UploadimagesService} from "../../../services/uploadimages.service";
import {AllUsersDataService} from "../../../services/all-users-data.service";
import {IUser} from "../../../models/IUser";

@Component({
  selector: 'app-create-team-page',
  templateUrl: './create-team-page.component.html',
  styleUrls: ['./create-team-page.component.less']
})
export class CreateTeamPageComponent implements OnInit {
  // teamForm: FormGroup;
  team: ITeam = {
    name: '',
    players: [],
    creatorId: '',
    id: '',
    avatar: ''
  };
  isCreating: boolean;
  selectedFile: File;
  teamTagName: string;
  localImage: string = './assets/AnonimusImage/stormgateLogo.png'
  // CurrentUser: IUser
  constructor(private router: Router,
              private route: ActivatedRoute,
              private teamService: TeamServiceService,
  private fileService: UploadimagesService,
              private allUsersdata: AllUsersDataService) {
    // this.teamForm = this.fb.group({
    //   name: ['', Validators.required],
    //   avatar: [''],
    // });
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const teamId = params.get("id");
      if ( teamId) {
        this.team.id =  teamId;
        this.teamService.getOneTeam(this.team.id)
          .subscribe((loadedTeam: ITeam) => {
            this.team = loadedTeam;
            this.teamTagName = `<${loadedTeam.name}>`
          })
        this.isCreating = false;
      } else {
        this.isCreating = true;
      }
    })
// this.allUsersdata.currentUser.subscribe(user => {
//   this.CurrentUser = user as IUser;
// })
  }
  onFileSelected(event: any):void {
    if (event && event.target && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
      this.onUploadTeamAvatar(this.selectedFile)
    }
  }
  onUploadTeamAvatar(file: File):void {
    if (file) {
      this.fileService.uploadTeamFile(file).pipe(
        catchError((error) => {
          console.error('Ошибка при загрузке файла:', error);
          return [];
        })
      ).subscribe((uploadedFile: IBanner) => {
        // this.UploadedFile = uploadedFile.imagePath;
        // const avatar = this.teamForm.get('avatar');
        // if (avatar) {
        //   avatar.setValue(uploadedFile.imagePath);
        // }
        this.loadImage();
        console.log(uploadedFile);
      })
    }
  }
  loadImage(): void {
    this.fileService.getTeamAvatar(this.selectedFile.name).subscribe((imageData: Blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        // reader.result содержит base64-кодированное изображение
        this.team.avatar = reader.result as string;
      };
      reader.readAsDataURL(imageData);
    });
  }
  onSubmit() {
    if (this.isCreating) {
      console.log(this.team)
        this.teamService.createTeam(this.team)
          .subscribe((createTeam: ITeam) => {
              this.team = createTeam;
              this.router.navigate([`/teams/${createTeam.id}`])
            }
          )
    } else {
      this.teamService.updateTeam(this.team.id, this.team)
        .subscribe((updateTeam: ITeam) => {
          this.team = updateTeam;
          this.team.players.forEach(playerId => {
            this.allUsersdata.GetOneUser(playerId).subscribe(user => {
              if (user.userName.includes(this.teamTagName)) {
                user.userName = user.userName.replace(this.teamTagName, `<${updateTeam.name}>`)
                this.allUsersdata.UpdateDateOfUser(user.id, user).subscribe(updatedUser => {
                  // this.CurrentUser = updatedUser
                })
              }
            })
          })
          this.router.navigate([`/teams/${updateTeam.id}`])
        })
    }
}
}
