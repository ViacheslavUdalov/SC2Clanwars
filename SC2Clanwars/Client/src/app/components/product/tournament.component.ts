import {Component, Input} from '@angular/core';
import {ITournament} from "../../models/Tournament-module";
@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html'
})
export class TournamentComponent {
  @Input() tournament: ITournament
  KostianchickBrotik = false
}
