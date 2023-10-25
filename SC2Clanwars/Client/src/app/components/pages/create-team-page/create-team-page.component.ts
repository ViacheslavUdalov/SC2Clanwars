import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ITeam} from "../../../models/teamModel";
import {TeamServiceService} from "../../../services/team-service.service";
import {catchError} from "rxjs";
import {IBanner} from "../../../models/Pictires";
import {UploadimagesService} from "../../../services/uploadimages.service";

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
  constructor(private router: Router,
              private route: ActivatedRoute,
              private teamService: TeamServiceService,
  private fileService: UploadimagesService) {
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
          })
        this.isCreating = false;
      } else {
        this.isCreating = true;
      }
    })


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
      // if (this.teamForm.valid) {
      //   const teamData = this.teamForm.value;
      console.log(this.team)
        this.teamService.createTeam(this.team)
          .subscribe((createTeam: ITeam) => {
              this.team = createTeam;
              this.router.navigate([`/teams/${createTeam.id}`])
            }
          )
      // }
    } else {
      // const {id, ...tournamentToCreate} = this.tournament;
      this.teamService.updateTeam(this.team.id, this.team)
        .subscribe((updateTeam: ITeam) => {
          this.team = updateTeam;
          this.router.navigate([`/teams/${updateTeam.id}`])
        })
    }
}
}
