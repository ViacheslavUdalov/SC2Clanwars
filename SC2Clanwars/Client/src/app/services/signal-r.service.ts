import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {BehaviorSubject, Subject} from 'rxjs';
import {ITournament} from "../models/tournamentModel";
import {HubConnectionBuilder} from "@microsoft/signalr";

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: signalR.HubConnection;
  private messageSubject = new Subject<string>();
  private tournamentsSubject = new BehaviorSubject<ITournament[]>([]);
  tournaments$ : BehaviorSubject<ITournament[]>  = this.tournamentsSubject;
  constructor() {}
    startConnection() {
      if (!this.hubConnection) {
        this.hubConnection = new HubConnectionBuilder()
          .withUrl('/tournaments-hub') // Замените на URL вашего SignalR хаба
          .build();

        this.hubConnection.start().then(() => {
          console.log('SignalR connection started');
          this.addTransferChartDataListener();
        });
      }
    }

    addTransferChartDataListener() {
      if (this.hubConnection && this.hubConnection.state === 'Connected') {
        this.hubConnection.on('ReceiveTournaments', (data: ITournament[]) => {
          this.tournamentsSubject.next(data);
        });
      } else {
        console.error('SignalR connection is not in the Connected state.');
      }
    }
}
