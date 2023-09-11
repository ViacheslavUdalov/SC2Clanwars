import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {ITournament} from "../../models/tournamentModel";
import {TournamentsService} from "../../services/tournaments.service";
import {SignalrService} from "../../services/signal-r.service";

@Component({
  selector: 'app-tournaments-page',
  templateUrl: './tournaments-page.component.html',
  styleUrls: ['./tournaments-page.component.less']
})
export class TournamentsPageComponent implements OnInit {
  tournaments$: BehaviorSubject<ITournament[]>
  loading = false
  term = ""
  constructor(private tournamentsService: TournamentsService, private signalrService: SignalrService) {
  }
  ngOnInit(): void {
    this.loading = true
    // this.tournaments$ = this.tournamentsService.getALL().pipe(
    //   tap(() => this.loading = false)
    // )
    this.signalrService.startConnection();
    this.signalrService.addTransferChartDataListener();
    this.loading = false
  }
}
