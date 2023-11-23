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
  team: ITeam = {
    name: '',
    players: [],
    creatorId: '',
    id: '',
    avatar: ''
  };
  isCreating: boolean;
  selectedFile: File;
userId: string;
CurrentUser: IUser
  teamTagName: string
  constructor(private router: Router,
              private route: ActivatedRoute,
              private teamService: TeamServiceService,
              private fileService: UploadimagesService,
              private updateUser: AllUsersDataService) {
    this.userId = localStorage.getItem('userId') || sessionStorage.getItem('userId') as string
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const teamId = params.get("id");
      if (teamId) {
        this.team.id = teamId;
        this.teamService.getOneTeam(this.team.id)
          .subscribe((loadedTeam: ITeam) => {
            this.team = loadedTeam;
            this.teamTagName = `<${this.team.name}>`
          })
        this.isCreating = false;
      } else {
        this.isCreating = true;
      }
    })
this.updateUser.currentUser.subscribe(user => {
  this.CurrentUser = user as IUser;
})
  }

  onFileSelected(event: any): void {
    if (event && event.target && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
      this.onUploadTeamAvatar(this.selectedFile)
    }
  }

  onUploadTeamAvatar(file: File): void {
    if (file) {
      this.fileService.uploadTeamFile(file).pipe(
        catchError((error) => {
          console.error('Ошибка при загрузке файла:', error);
          return [];
        })
      ).subscribe((uploadedFile: IBanner) => {
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
          // this.CurrentUser.userName = `<${this.team.name}>${this.CurrentUser.userName}`
          //   this.CurrentUser.team = this.team.name;
          this.team.players.forEach(playerId => {
            this.updateUser.GetOneUser(playerId).subscribe(user => {
              if(user.userName.includes(this.teamTagName)) {
                user.userName = user.userName.replace(this.teamTagName, `<${updateTeam.name}>`);
                user.team = this.team.name;
                this.updateUser.UpdateDateOfUser(this.userId, user).subscribe(updateUser => {
                  this.CurrentUser = updateUser;
                })
              }
            })
          })

          this.router.navigate([`/teams/${updateTeam.id}`])
        })
    }
  }
}
