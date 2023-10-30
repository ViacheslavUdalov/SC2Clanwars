import { Injectable } from '@angular/core';
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {BehaviorSubject, Subject} from "rxjs";
import {IChatUsers} from "../models/chatMessages";
import {LogLevel} from "@aspnet/signalr";

@Injectable({
  providedIn: 'root'
})
export class ChatUsersService {
  // public connection: HubConnection;
  // private receiveMessages = new Subject<any>();
  public messages$ = new BehaviorSubject<IChatUsers[]>([]);
  public messages: IChatUsers[] = [];
  public connection: HubConnection;
  private createConnection() {
    this.connection = new HubConnectionBuilder()
      .withUrl('http://localhost:5034/chathub')
      .configureLogging(LogLevel.Information)
      .build();
  }
  constructor() {
    // this.startConnection().then(() => {
    this.createConnection()
    this.ReceivedMessagesFromBd();
this.ReceivedMessagesRightNow();
    // })
  }
public ReceivedMessagesFromBd() {
  this.connection.on("ReceiveUsersMessages",  (messages: IChatUsers[]) => {
    this.messages$.next(messages);
    console.log(this.messages$);
  });
}
  public ReceivedMessagesRightNow() {
    this.connection.on("ReceiveUserMessage", (senderId : string, receiverId: string,  message: string) => {
      const chatUser: IChatUsers = {
        id: '',
        senderId: senderId,
        receiverId: receiverId,
        timestamp: new Date(),
        message: message
      };
      this.messages = [...this.messages, chatUser];
      console.log(this.messages)
      this.messages$.next(this.messages);
    })
  }
public startConnection() {
  try {
    // проверка нужна, что бы приложение не подключалось заново к хабу, если соединение уже установлено.
    if (this.connection.state !== 'Connected') {
       this.connection.start().then(r => {
         console.log("connection established");
       })

    } else {
      console.log("Connection is already established");
    }
  } catch (err) {
    console.error('Error establishing SignalR connection:', err)
  }
}
 public  async getMessages(senderId: string, receiverId: string) {
    if (this.connection.state === 'Connected') {
      try {
         const messages = await this.connection.invoke("GetAllMessagesBetweenUsers", senderId, receiverId)
           console.log("Request all messages");
           console.log(messages)
           this.messages = [...this.messages, messages];
           console.log(this.messages)
           this.messages$.next(this.messages);
      } catch (error) {
        console.error("Error requesting messages", error);
      }
    }
  }
public async  sendMessages(senderId: string, receiverId: string, message: string) {
  console.log(senderId)
 console.log(receiverId);
  console.log(message)
    await this.connection.invoke('SendMessageToUniqueUser', senderId, receiverId, message);
  // await this.getMessages(senderId, receiverId)
  }
}
