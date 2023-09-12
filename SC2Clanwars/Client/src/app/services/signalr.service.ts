import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {BehaviorSubject, Subject} from 'rxjs';
import {ITournament} from "../models/tournamentModel";
import {HubConnectionBuilder} from "@microsoft/signalr";

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  public tournaments!: ITournament[];
  public hubConnection!: signalR.HubConnection;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7285/booking', {
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();
    this.hubConnection
      .start()
      .then(() => {
          console.log("hubConnectionStarted")
        this.askServerListener();
        this.askServer();
        console.log('Connection started')
      }
      )
      .catch(err => console.log('Error while starting connection: ' + err))
  }
public askServer () {
  console.log("AskServerStarted")
this.hubConnection.invoke("GetTournaments")
  .then(() => console.log("Ask Server GetTournaments.then"))
  .catch(err => console.log(err))
}
public askServerListener () {
  console.log("AskServerListenerStarted")
    this.hubConnection.on("ReceiveTournament", (tournament: ITournament) => {
      console.log(tournament)
      console.log("AskServerListener Then")
    })
}
  // public addBookingDataListener = () => {
  //   this.hubConnection.on('sendbookingdata', (data) => {
  //     this.data = data;
  //     console.log("Booking Name:  " + data.name + " - Is Available:  " + data.isAvailable);
  //   });
  // }
}
