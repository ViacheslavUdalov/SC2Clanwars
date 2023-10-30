import {Component, OnInit} from '@angular/core';
import {TeamServiceService} from "../../../services/team-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ITeam} from "../../../models/teamModel";
import {IUser} from "../../../models/IUser";
import {AllUsersDataService} from "../../../services/all-users-data.service";
import {ChatServiceService} from "../../../services/chat-service.service";

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.less']
})
export class TeamPageComponent implements OnInit{
  team: ITeam;
  creatorTeam: IUser;
  userId: string;
  CurrentUser: IUser;
  teamPlayers: IUser[] = [];
  isUserInTeam: boolean = false;
  constructor(private teamService: TeamServiceService,
              private route: ActivatedRoute,
              private router: Router,
              private allDataUser: AllUsersDataService,
              private chatService: ChatServiceService
  ) {
      this.userId = localStorage.getItem('userId') || sessionStorage.getItem('userId') as string
  }
  ngOnInit() {
    this.chatService.start();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log(id)
      if (id) {
        this.teamService.getOneTeam(id).subscribe(team => {
          this.team = team;
          console.log(this.team);
          this.checkForNewPlayers();
          if (this.team.creatorId) {
            this.allDataUser.GetOneUser(this.team.creatorId).subscribe(creatorTeam => {
              this.creatorTeam = creatorTeam;
            })
          }
        })
      }
    })

    this.allDataUser.GetOneUser(this.userId).subscribe(currentUser => {
      this.CurrentUser = currentUser;
    })
  }
public JoinToTeam() {
    this.team.players.push(this.CurrentUser.id);
    this.teamService.updateTeam(this.team.id, this.team).subscribe((updatedTeam: ITeam)=> {
      this.team = updatedTeam;
      this.checkForNewPlayers();
      this.isUserInTeam = true;
      console.log(this.team);
    })
}
checkForNewPlayers() {
  this.team.players.forEach(playerId => {
    this.allDataUser.GetOneUser(playerId).subscribe(player => {
      this.teamPlayers.push(player);
      if (this.team.players.includes(this.CurrentUser.id)) {
        this.isUserInTeam = true;
      }
    })
  })
}
JoinToChat() {
    this.chatService.joinRoom(this.CurrentUser.userName, this.team.name).then(() => {
      this.router.navigate([`team/${this.team.id}/chat`]);
    }).catch((err) => {
      console.log(err);
    })
}
}
