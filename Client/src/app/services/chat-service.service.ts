import {Injectable} from '@angular/core';
import {HubConnectionBuilder} from "@microsoft/signalr";
import {BehaviorSubject} from "rxjs";
import {ITeamChat} from "../models/chatMessages";
@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  public messages$ = new BehaviorSubject<ITeamChat[]>([]);
  public users$ = new BehaviorSubject<string[]>([]);
  public messages: ITeamChat[] = [];
  public users: string[] = [];
  public connection  =
    new HubConnectionBuilder()
      .withUrl('http://localhost:5034/chathub')
      .build();
  constructor() {
    this.start();
    this.connection.on("ReceivedMessages", (messages: ITeamChat[]) => {
      this.messages$.next(messages);
      this.messages = messages;
      console.log(messages)
    });
    this.connection.on("ReceiveMessage",
      (message: ITeamChat) => {
        // console.log("User: ", user);
        // console.log("message: ", message);
        // console.log("messageTime: ", messageTime);
        this.messages = [...this.messages, message];
        console.log( this.messages)
        this.messages$.next(this.messages);
      });
    this.connection.on("ConnectedUser", (users: string[]) => {
      this.users$.next(users)
    });

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
  public async sendMessage(message: string):Promise<string> {
  return  await this.connection.invoke('SendMessage', message)
  }
  // getAllMessagesFromBd
  public async getAllMessagesFromBd(room: string) : Promise<ITeamChat[]> {
   return  await this.connection.invoke('GetAllMessagesFromDb', room)
  }
  // leave chat
  public async leaveChat() {
   if(this.connection) {
     await  this.connection.stop().catch((err) => console.log(err));
    }
}
}
