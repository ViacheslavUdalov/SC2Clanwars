import {Injectable} from '@angular/core';
import * as signalR from '@aspnet/signalr';
@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  public hubConnection: signalR.HubConnection;

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
        this.hubConnection.invoke("GetTournaments")
        console.log('Connection started')
      })
      .catch(err => console.log('Error while starting connection: ' + err))
  }
  public stopConnection = () => {
    if (this.hubConnection) {
      this.hubConnection.stop();
      console.log('Соединение с SingalR разорвано')
    }
  }
}
