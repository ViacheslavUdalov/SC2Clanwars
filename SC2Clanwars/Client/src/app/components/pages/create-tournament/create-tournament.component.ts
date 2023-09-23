import { Component } from '@angular/core';
  import {ITournament} from "../../../models/tournamentModel";
import { Router } from '@angular/router';
import {TournamentsService} from "../../../services/tournaments.service";

@Component({
  selector: 'app-create-tournament',
  templateUrl: './create-tournament.component.html',
  styleUrls: ['./create-tournament.component.less']
})
export class CreateTournamentComponent {
  tournament: ITournament = {
    name: '',
    prizePool: '',
    avatar: '',
    teams: []
  };
constructor(private tournamentService: TournamentsService, private router: Router) {}
  onSubmit() {
  this.tournamentService.createTournament(this.tournament)
    .subscribe(() => {
        // this.tournament= tournament;
      // tournament = this.tournament;
      //   console.log(tournament)
        }
    )
  }
}
