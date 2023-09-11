import { Component } from '@angular/core';
import {ITournament} from "./models/Tournament-module";
import {Tournaments as data} from './data/tournament-API'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Client';
  tournaments: ITournament[] = data
}
