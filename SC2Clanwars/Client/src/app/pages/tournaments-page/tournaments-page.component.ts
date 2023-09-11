import { Component } from '@angular/core';
import {Observable, tap} from "rxjs";
import {ITournament} from "../../models/tournamentModel";
import {TournamentsService} from "../../services/tournaments.service";

@Component({
  selector: 'app-tournaments-page',
  templateUrl: './tournaments-page.component.html',
  styleUrls: ['./tournaments-page.component.less']
})
export class TournamentsPageComponent {
  title = 'Client';
  tournaments$: Observable<ITournament[]>
  loading = false
  term = ""
  constructor(private tournamentsService: TournamentsService) {
  }
  ngOnInit(): void {
    this.loading = true
    this.tournaments$ = this.tournamentsService.getALL().pipe(
      tap(() => this.loading = false)
    )
  }
}
