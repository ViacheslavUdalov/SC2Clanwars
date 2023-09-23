import { Component, OnDestroy, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ITournament} from "../../../models/tournamentModel";
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import {TournamentsService} from "../../../services/tournaments.service";
@Component({
  selector: 'app-tournaments-page',
  templateUrl: './tournaments-page.component.html',
  styleUrls: ['./tournaments-page.component.less'],
})
export class TournamentsPageComponent implements OnInit, OnDestroy {
  tournaments$: BehaviorSubject<ITournament[]> = new BehaviorSubject<ITournament[]>([]);
  loading: boolean = true;
  constructor(private router: Router, private tournamentService : TournamentsService) {
}
  ngOnInit() {
    this.tournamentService.getTournaments().subscribe((tournaments: ITournament[]) => {
      this.tournaments$.next(tournaments);
    });
  }
  ngOnDestroy() {
  }

}
