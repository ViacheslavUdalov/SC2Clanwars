import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatServiceService} from "../../../services/chat-service.service";
import {IUser} from "../../../models/IUser";
import {AllUsersDataService} from "../../../services/all-users-data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-chatpage',
  templateUrl: './chatpage.component.html',
  styleUrls: ['./chatpage.component.less']
})
export class ChatPageComponent implements OnInit{
  ReceivedMessage: any[];
  messageToSend: string;
  userId: string
  user: IUser
constructor(private chatService: ChatServiceService,
            private allUsersdata: AllUsersDataService,
            private router: Router) {
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
   // ngOnDestroy() {
   //  this.leaveChat();
   // }
}
