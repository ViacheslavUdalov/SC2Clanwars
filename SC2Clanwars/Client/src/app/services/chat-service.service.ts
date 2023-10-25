import {Injectable} from '@angular/core';
import {HubConnectionBuilder} from "@microsoft/signalr";
import {IUser} from "../models/IUser";
import {BehaviorSubject} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  public messages$ = new BehaviorSubject<any>([]);
  public users$ = new BehaviorSubject<string[]>([]);
  public messages: any[] = [];
  public users: string[] = [];
  public connection  =
    new HubConnectionBuilder()
      .withUrl('http://localhost:5034/chathub')
      .build();
  constructor() {
    this.start();
    this.connection.on("ReceiveMessage",
      (user: string, message: string, messageTime: string) => {
        console.log("User: ", user);
        console.log("message: ", message);
        console.log("messageTime: ", messageTime);
        this.messages = [...this.messages, {user, message, messageTime}];
        console.log(this.messages)
        this.messages$.next(this.messages);
      });
    this.connection.on("ConnectedUser", (users: string[]) => {
      this.users$.next(users)
    })
  }
 //start connection
  public async start() {
    try {
      await this.connection.start();
      console.log("connection is establish")
    } catch (error) {
      console.log(error);
    }
  }

  // join room
  public async joinRoom(user: string, room: any) {
   await this.connection.invoke('JoinRoom', {user, room})
  };
  // send message
  public async sendMessage(message: string) {
   await this.connection.invoke('SendMessage', message)
  }
  // leave chat
  public async leaveChat() {
   if(this.connection) {
     await  this.connection.stop().catch((err) => console.log(err));
    }
}
}
