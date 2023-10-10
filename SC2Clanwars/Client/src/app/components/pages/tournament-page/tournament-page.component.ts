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
// id : string | null = null;
  constructor(
    private tournamentsService : TournamentsService,
  private route : ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
       const id = params.get('id');
      console.log(id)
      if (id) {
        this.tournamentsService.getOneTournament(id).subscribe(tournaments => {
          this.tournament = tournaments;
        })
      }
    })

  }
 RemoveTournament(id: string) {
    this.tournamentsService.deleteTournament(id).subscribe(() => {
      this.router.navigate([`/tournaments`]);
    })

}
  ngOnDestroy() {
  }
}
