import { Component } from '@angular/core';
import {ITournament} from "./models/tournamentModel";
import {Tournaments as data} from './data/tournaments'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Client';
  tournaments: ITournament[] = data
}
