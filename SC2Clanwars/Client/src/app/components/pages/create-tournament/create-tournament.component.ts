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
  teams: [],
  avatar: ''
};
constructor(private tournamentService: TournamentsService, private router: Router) {}
  onSubmit() {
  this.tournamentService.createTournament(this.tournament)
    .subscribe((result) => {
// this.router.navigate(['tournaments'])
    })
  }
}
