import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITournament } from '../../models/tournamentModel';
import { SignalrService } from '../../services/signalr.service';

@Component({
  selector: 'app-tournaments-page',
  templateUrl: './tournaments-page.component.html',
  styleUrls: ['./tournaments-page.component.less'],
})
export class TournamentsPageComponent implements OnInit, OnDestroy {
  tournaments$: BehaviorSubject<ITournament[]> = new BehaviorSubject<ITournament[]>([]);
  loading = false;
  term = '';

  constructor(public signalRService: SignalrService) {}

  ngOnInit() {
    this.signalRService.startConnection();
    this.subscribeToTournaments();
  }

  ngOnDestroy() {
    this.signalRService.hubConnection.off('ReceiveTournament');
  }

  private subscribeToTournaments() {
    this.signalRService.hubConnection.on('ReceiveTournament', (tournaments) => {
      this.tournaments$.next(tournaments);
      console.log('Получены турниры через SignalR:', tournaments);
    });
  }
}
