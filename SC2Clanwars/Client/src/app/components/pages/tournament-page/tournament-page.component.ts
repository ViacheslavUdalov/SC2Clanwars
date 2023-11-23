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
  LocalId: string
creatorTournament: IUser | null;
  tournamentPlayers: IUser[] = [];
  isUserInTournament: boolean = false;
  constructor(
    private tournamentsService : TournamentsService,
  private route : ActivatedRoute,
    private router: Router,
    private allUserData: AllUsersDataService
  ) {
    this.LocalId = localStorage.getItem('userId') || sessionStorage.getItem('userId') || '';
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
       const id = params.get('id');
      console.log(id)
      if (id) {
        this.tournamentsService.getOneTournament(id).subscribe(tournaments => {
          this.tournament = tournaments;
          this.checkForNewPlayers();
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
 JoinToTournament(id: string) {
    this.tournament.players.push(this.LocalId);
   this.tournamentsService.updateTournament(id, this.tournament).subscribe(updatedTournament => {
     this.tournament = updatedTournament;
     this.checkForNewPlayers();
     console.log(this.tournament)
   })
 }
  checkForNewPlayers() {
    this.tournament.players.forEach(playerId => {
      this.allUserData.GetOneUser(playerId).subscribe(player => {
        this.tournamentPlayers.push(player);
        if (this.tournament.players.includes(this.LocalId)) {
          this.isUserInTournament = true;
        }
      })
    })
  }
}
