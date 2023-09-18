import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {ITournament} from "../../../models/tournamentModel";
import {SignalrService} from "../../../services/signalr.service";

@Component({
  selector: 'app-tournaments-page',
  templateUrl: './tournaments-page.component.html',
  styleUrls: ['./tournaments-page.component.less'],
})
export class TournamentsPageComponent implements OnInit, OnDestroy {
  tournaments$: BehaviorSubject<ITournament[]> = new BehaviorSubject<ITournament[]>([]);
  loading: boolean = true;

  constructor(public signalRService: SignalrService) {
    this.signalRService.startConnection()
  }
  ngOnInit() {
    this.signalRService.onReceiveTournament((tournaments) => {
      this.tournaments$ = tournaments;
    });
  }
  ngOnDestroy() {
    this.signalRService.stopConnection();
  }
  private subscribeToTournaments() {
    this.signalRService.hubConnection.on('ReceiveTournament', async (tournaments: ITournament[]) => {
      this.tournaments$.next(tournaments);
    });
  };
  private SendRequestToServer() {
    this.signalRService.hubConnection.invoke("GetTournaments").then((result) => {
      console.log(result);
    })
      .catch(err => console.error("Ошибка при отправке запроса на сервер" + err));
  }
}
