import {Component, Input} from '@angular/core';
import {ITournament} from "../../models/tournamentModel";
@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html'
})
export class TournamentComponent {
  @Input() tournament: ITournament
  KostianchickBrotik = false

  showAdditionalInfo = false;

  toggleAdditionalInfo() {
    this.showAdditionalInfo = !this.showAdditionalInfo;
  }
}
