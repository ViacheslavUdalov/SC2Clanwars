import {Component, OnInit} from '@angular/core';
import {ChatUsersService} from "../../../services/chat-users.service";
import {ActivatedRoute} from "@angular/router";
import {IChatUsers} from "../../../models/chatMessages";
import {AllUsersDataService} from "../../../services/all-users-data.service";
import {IUser} from "../../../models/IUser";

@Component({
  selector: 'app-chat-users-page',
  templateUrl: './chat-users-page.component.html',
  styleUrls: ['./chat-users-page.component.less']
})
export class ChatUsersPageComponent implements OnInit{
  ReceivedMessages: IChatUsers[];
  messageToSend: string;
  currentUserId: string;
  receiverUserId: string
currentUser: IUser;
  receiverUser: IUser;
  isLoading: boolean
constructor(private chatUsers: ChatUsersService,
            private route: ActivatedRoute,
            private allUsersData: AllUsersDataService) {
    this.currentUserId  = localStorage.getItem('userId') || sessionStorage.getItem('userId') as string;
}
 ngOnInit() {
    this.isLoading = true;
  this.route.paramMap.subscribe(params => {
    this.receiverUserId = params.get("id") as string;
  })
this.chatUsers.getMessagesByController(this.currentUserId, this.receiverUserId).subscribe(messages => {
  this.ReceivedMessages = messages;
})
   this.allUsersData.GetOneUser(this.currentUserId).subscribe(currUs => {
     this.currentUser = currUs;
   });

   this.allUsersData.GetOneUser(this.receiverUserId).subscribe(receivUs => {
     this.receiverUser = receivUs;
     this.isLoading = false;
   })
    // if (this.chatUsers.connection.state === 'Connected') {
    //   this.chatUsers.getMessages(this.currentUserId, this.receiverUserId)
    //   this.chatUsers.messages$.subscribe(messages => {
    //     this.ReceivedMessages = messages;
    //     console.log(this.ReceivedMessages)
    //   })
    // }
    console.log(this.ReceivedMessages);

}
sendMessage() {
    this.chatUsers.sendMessages(this.currentUserId, this.receiverUserId, this.messageToSend)
      .then(() => {
        this.chatUsers.getMessagesByController(this.currentUserId, this.receiverUserId).subscribe(messages => {
          this.ReceivedMessages = messages;
        })
      this.messageToSend = "";
    }).catch((err) => {
      console.error(err);
    })
}
}
