import {Component, OnDestroy, OnInit} from '@angular/core';
import {ITournament} from "../../../models/tournamentModel";
import {TournamentsService} from "../../../services/tournaments.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-tournament-page',
  templateUrl: './tournament-page.component.html',
  styleUrls: ['./tournament-page.component.less']
})
export class TournamentPageComponent implements OnInit, OnDestroy{
tournament: ITournament;

  constructor(
    private tournamentsService : TournamentsService,
  private route : ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id']
      console.log(id)
   this.tournamentsService.getOneTournament(id).subscribe(tournaments => {
     this.tournament = tournaments;
   })
    })

  }

  ngOnDestroy() {
  }
}
