import {Component, OnInit} from '@angular/core';
import {ChatUsersService} from "../../../services/chat-users.service";
import {ActivatedRoute} from "@angular/router";
import {IChatUsers} from "../../../models/chatMessages";

@Component({
  selector: 'app-chat-users-page',
  templateUrl: './chat-users-page.component.html',
  styleUrls: ['./chat-users-page.component.less']
})
export class ChatUsersPageComponent implements OnInit{
  messages: IChatUsers[];
  messageToSend: string;
  currentUserId: string;
  receiverUserId: string

constructor(private chatUsers: ChatUsersService,
            private route: ActivatedRoute) {
    this.currentUserId  = localStorage.getItem('userId') || sessionStorage.getItem('userId') as string;
}
 ngOnInit() {
  this.route.paramMap.subscribe(params => {
    this.receiverUserId = params.get("id") as string;
  })
    if (this.chatUsers.connection.state === 'Connected') {
      this.chatUsers.messages$.subscribe(messages => {
        this.messages = messages;
        console.log(this.messages)
      })
    }
    // if (this.chatUsers.connection.state === 'Connected') {
    //   try {
   this.chatUsers.startConnection()
        this.chatUsers.getMessages(this.currentUserId, this.receiverUserId)
      // } catch (error ) {
      //   console.error(error);
      // }
    // }

    console.log(this.messages)
}
sendMessage() {
    this.chatUsers.sendMessages(this.currentUserId, this.receiverUserId, this.messageToSend)
      .then(() => {
      this.messageToSend = "";
    }).catch((err) => {
      console.error(err);
    })
}
}
