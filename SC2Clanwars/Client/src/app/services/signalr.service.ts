import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import {ITournament} from "../models/tournamentModel";

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  public tournaments: ITournament[] = [];
  public hubConnection!: signalR.HubConnection;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44311/tournaments-hub', {
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();

    this.hubConnection.on("ReceiveTournament",
      (tournaments: ITournament[]) => {
this.tournaments = tournaments;
        console.log('Получены турниры:', tournaments);
      })

    this.hubConnection
      .start()
      .then(() => {
          console.log('Соединение с SignalR установлено')
        this.hubConnection.invoke("GetTournaments")
        console.log('Connection started')
      })
      .catch(err => console.log('Error while starting connection: ' + err))
  }
}
