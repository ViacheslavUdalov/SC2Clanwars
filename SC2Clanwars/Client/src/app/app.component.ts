import {Component, OnInit} from '@angular/core';
import {ITournament} from "./models/tournamentModel";
import {Tournaments as data} from './data/tournaments'
import {TournamentsService} from "./services/tournaments.service";
import {Observable, tap} from "rxjs";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

}
