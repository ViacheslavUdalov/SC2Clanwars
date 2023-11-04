import { Injectable } from '@angular/core';
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {IChatUsers} from "../models/chatMessages";
import {HttpClient} from "@angular/common/http";

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
      .withUrl('http://localhost:5034/chatbetweenusershub')
      .build();
  }
  constructor(private http: HttpClient) {
    // this.startConnection().then(() => {
    this.createConnection();
    this.connection.on("ReceiveUsersMessages",  (messages: IChatUsers[]) => {
      this.messages$.next(messages);
      console.log(this.messages$);
    });
    this.connection.on("ReceiveUserMessage", (message: IChatUsers) => {
      this.messages = [...this.messages, message];
      console.log(this.messages)
      this.messages$.next(this.messages);
    })
//     this.ReceivedMessagesFromBd();
// this.ReceivedMessagesRightNow();
    this.startConnection();
    // })
  }
public ReceivedMessagesFromBd() {
  this.connection.on("ReceiveUsersMessages",  (messages: IChatUsers[]) => {
    this.messages$.next(messages);
    console.log(this.messages$);
  });
}
  public ReceivedMessagesRightNow() {
    this.connection.on("ReceiveUserMessage", (message: IChatUsers) => {
      this.messages = [...this.messages, message];
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
 // public  async getMessages(senderId: string, receiverId: string) {
 //    if (this.connection.state === 'Connected') {
 //      try {
 //         const messages = await this.connection.invoke("GetAllMessagesBetweenUsers", senderId, receiverId)
 //           console.log("Request all messages");
 //           console.log(messages)
 //           this.messages = [...this.messages, messages];
 //           console.log(this.messages)
 //           this.messages$.next(this.messages);
 //      } catch (error) {
 //        console.error("Error requesting messages", error);
 //      }
 //    }
 //  }
  public getMessages(senderId: string, receiverId: string): void {
    if (this.connection.state === 'Connected') {
      this.connection.invoke('GetAllMessagesBetweenUsers', senderId, receiverId)
        .catch(error => console.error('Error requesting messages', error));
    }
  }
public async  sendMessages(senderId: string, receiverId: string, message: string) {
  console.log(senderId);
 console.log(receiverId);
  console.log(message);
    await this.connection.invoke('SendMessageToUniqueUser', senderId, receiverId, message);
  // await this.getMessages(senderId, receiverId)
  }
  getMessagesByController(senderId: string, receiverId : string) : Observable<IChatUsers[]> {
    return this.http.get<IChatUsers[]>(`http://localhost:5034/api/getmessages/getmessagesfromuser/${senderId}&${receiverId}` )
  }
}
