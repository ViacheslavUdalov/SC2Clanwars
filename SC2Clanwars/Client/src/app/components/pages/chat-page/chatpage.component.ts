import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatServiceService} from "../../../services/chat-service.service";
import {IUser} from "../../../models/IUser";
import {AllUsersDataService} from "../../../services/all-users-data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TeamServiceService} from "../../../services/team-service.service";
import {ITeam} from "../../../models/teamModel";

@Component({
  selector: 'app-chatpage',
  templateUrl: './chatpage.component.html',
  styleUrls: ['./chatpage.component.less']
})
export class ChatPageComponent implements OnInit{
  ReceivedMessage: any[];
  messageToSend: string;
  userId: string
  user: IUser;
  team: ITeam;
  teamId: string | null;
constructor(private chatService: ChatServiceService,
            private allUsersdata: AllUsersDataService,
            private router: Router,
            private teamService: TeamServiceService,
            private route: ActivatedRoute) {
    if (localStorage.getItem('userId')) {
      this.userId = localStorage.getItem('userId') as string
    }
  if (sessionStorage.getItem('userId')) {
    this.userId = sessionStorage.getItem('userId') as string
  }
}
ngOnInit() {
    this.allUsersdata.GetOneUser(this.userId).subscribe(gettingUser => {
      this.user = gettingUser;
    })
  this.route.paramMap.subscribe(params => {
    this.teamId = params.get('id');
    if (this.teamId) {
      this.teamService.getOneTeam(this.teamId).subscribe(gettingTeam => {
        this.team = gettingTeam;
        console.log(this.team);
      })
    }
  })
  if (this.team) {
    this.chatService.joinRoom(this.userId, this.team.name);
  }
  if (this.chatService.connection.state === 'Connected') {
    this.chatService.messages$.subscribe(res => {
      console.log(this.ReceivedMessage)
      this.ReceivedMessage = res;
    });
  }else {
    console.log('Соединение не установлено')
  }
}
sendMessage() {
  this.chatService.sendMessage(this.messageToSend).then(() => {
    console.log(this.messageToSend)
    this.messageToSend = '';
  }).catch((err) => {
    console.log(err);
  })
}
  leaveChat() {
    this.chatService.leaveChat().then(() => {
      this.messageToSend = '';
    }).catch((err) => {
      console.log(err);
    })
  }
}
