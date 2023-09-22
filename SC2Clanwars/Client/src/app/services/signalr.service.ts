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
      .withUrl('http://localhost:5034/tournament-hub', {
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();
    this.hubConnection
      .start()
      .then(() => {
        this.hubConnection.invoke("GetTournaments").then((res) => console.log(res)).catch(err => console.error(err));
        // this.hubConnection.on('ReceiveTournament', async (tournaments: ITournament[]) => {
        //   this.tournaments$.next(tournaments);
        // });
        console.log('Соединение с SignalR установлено')
      })
      .catch(err => console.log('Ошибка в установке соединения ' + err))
  }
  public onReceiveTournament(callback: (tournaments: any) => void) {
    this.hubConnection.on('ReceiveTournament', (tournaments) => {
      callback(tournaments);
    });
  };
  public stopConnection = () => {
    // if (this.hubConnection && this.hubConnection.state === HubConnectionState.Connected) {
      if (this.hubConnection) {
        this.hubConnection.stop();
        console.log('Соединение с SingalR разорвано')
      // }
    }
  }
}
