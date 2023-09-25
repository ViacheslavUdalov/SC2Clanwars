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
    id: '',
    name: '',
    prizePool: '',
    avatar: '',
    teams: []
  };
constructor(private tournamentService: TournamentsService, private router: Router) {}
  onSubmit() {
  this.tournamentService.createTournament(this.tournament)
    .subscribe((createdTournament: ITournament) => {
      this.tournament = createdTournament;
      this.router.navigate([`/tournaments/${createdTournament.id}` ])
      }
    )
  }
}
