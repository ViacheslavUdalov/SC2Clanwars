import { Component, OnDestroy, OnInit } from '@angular/core';
import {ITournament} from "../../../models/tournamentModel";
import { Router} from '@angular/router';
import {TournamentsService} from "../../../services/tournaments.service";
@Component({
  selector: 'app-tournaments-page',
  templateUrl: './tournaments-page.component.html',
  styleUrls: ['./tournaments-page.component.less'],
})
export class TournamentsPageComponent implements OnInit, OnDestroy {
  tournaments:  ITournament[];
  loading: boolean = true;
  constructor(private router: Router, private tournamentService : TournamentsService) {
}
  ngOnInit() {
     this.tournamentService.getTournaments().subscribe((tournaments: ITournament[]) => {
       this.tournaments = tournaments;
       console.log(this.tournaments)
     })

  }
  ngOnDestroy() {
  }

}
