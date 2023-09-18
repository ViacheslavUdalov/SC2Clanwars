import {Injectable} from '@angular/core';
import * as signalR from '@aspnet/signalr';
import {BehaviorSubject} from "rxjs";
import {ITournament} from "../models/tournamentModel";
@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  public hubConnection: signalR.HubConnection;
  tournaments$: BehaviorSubject<ITournament[]> = new BehaviorSubject<ITournament[]>([]);

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5034/tournaments-hub', {
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();
    this.hubConnection
      .start()
      .then(() => {
        console.log('Соединение с SignalR установлено')
      })
      .catch(err => console.log('Ошибка в установке соединения ' + err))
  }
  public onReceiveTournament(callback: (tournaments: any) => void) {
    this.hubConnection.on('ReceiveTournament', (tournaments) => {
      callback(tournaments);
    });
  }
  public stopConnection = () => {
    if (this.hubConnection) {
      this.hubConnection.stop();
      console.log('Соединение с SingalR разорвано')
    }
  }
}
