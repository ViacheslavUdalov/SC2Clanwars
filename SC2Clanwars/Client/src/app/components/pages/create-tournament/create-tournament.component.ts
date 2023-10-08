import {Component, OnInit} from '@angular/core';
import {ITournament} from "../../../models/tournamentModel";
import {ActivatedRoute, Router} from '@angular/router';
import {TournamentsService} from "../../../services/tournaments.service";

@Component({
  selector: 'app-create-tournament',
  templateUrl: './create-tournament.component.html',
  styleUrls: ['./create-tournament.component.less']
})
export class CreateTournamentComponent implements OnInit {
  tournament: ITournament = {
    id: '',
    name: '',
    prizePool: '',
    avatar: '',
    teams: []
  };
  isCreating: boolean = true;

  constructor(private tournamentService: TournamentsService,
              private router: Router,
              private route: ActivatedRoute) {
  }
ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const tournamentId = params.get("id");
      if (tournamentId) {
        this.tournament.id = tournamentId;
        this.isCreating = false;
      }
    })
  this.tournamentService.getOneTournament(this.tournament.id)
    .subscribe((loadedTournament: ITournament) => {
      this.tournament = loadedTournament;
  })
}

  onSubmit() {
    if (this.isCreating) {

      this.tournamentService.createTournament(this.tournament)
        .subscribe( (createdTournament: ITournament) => {
            this.tournament = createdTournament;
            this.router.navigate([`/tournaments/${createdTournament.id}`])
          }
        )
    } else {
      // const {id, ...tournamentToCreate} = this.tournament;
      this.tournamentService.updateTournament(this.tournament.id, this.tournament)
        .subscribe((updatedTournament: ITournament) => {
          this.tournament = updatedTournament;
          this.router.navigate([`/tournaments/${updatedTournament.id}`])
        })
    }
  }
}
