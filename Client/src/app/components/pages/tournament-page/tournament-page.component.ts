import {Component, OnDestroy, OnInit} from '@angular/core';
import {ITournament} from "../../../models/tournamentModel";
import {TournamentsService} from "../../../services/tournaments.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AllUsersDataService} from "../../../services/all-users-data.service";
import {IUser} from "../../../models/IUser";

@Component({
  selector: 'app-tournament-page',
  templateUrl: './tournament-page.component.html',
  styleUrls: ['./tournament-page.component.less']
})
export class TournamentPageComponent implements OnInit{
tournament: ITournament;
creatorTournament: IUser | null;
  constructor(
    private tournamentsService : TournamentsService,
  private route : ActivatedRoute,
    private router: Router,
    private allUserData: AllUsersDataService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
       const id = params.get('id');
      console.log(id)
      if (id) {
        this.tournamentsService.getOneTournament(id).subscribe(tournaments => {
          this.tournament = tournaments;
          console.log(this.tournament)
          if (this.tournament.creatorId) {
            this.allUserData.currentUser.subscribe(currentIUser => {
              this.creatorTournament = currentIUser;
            })
          }
        })
      }
    })
  }
 RemoveTournament(id: string) {
   this.tournamentsService.deleteTournament(id).subscribe(() => {
     this.router.navigate([`/tournaments`]);
   })

 }
}
