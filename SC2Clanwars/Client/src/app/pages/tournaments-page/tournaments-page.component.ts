import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {ITournament} from "../../models/tournamentModel";
import {TournamentsService} from "../../services/tournaments.service";
import {SignalrService} from "../../services/signalr.service";

@Component({
  selector: 'app-tournaments-page',
  templateUrl: './tournaments-page.component.html',
  styleUrls: ['./tournaments-page.component.less']
})
export class TournamentsPageComponent implements OnInit, OnDestroy {
  tournaments$: BehaviorSubject<ITournament[]>
  loading = false
  term = ""
  constructor(public signalRService: SignalrService) { }

  ngOnInit() {
    this.signalRService.startConnection();
  }
  ngOnDestroy() {
    this.signalRService.hubConnection.off("ReceiveTournament");
  }

}
