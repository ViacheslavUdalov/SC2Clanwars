import { Component, OnDestroy, OnInit } from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {ITournament} from "../../../models/tournamentModel";
import * as signalR from "@aspnet/signalr";
import {SignalrService} from "../../../services/signalr.service";
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-tournaments-page',
  templateUrl: './tournaments-page.component.html',
  styleUrls: ['./tournaments-page.component.less'],
})
export class TournamentsPageComponent implements OnInit, OnDestroy {
  tournaments$: BehaviorSubject<ITournament[]> = new BehaviorSubject<ITournament[]>([]);
  loading: boolean = true;
  public hubConnection: signalR.HubConnection;
  private routerSubscription: Subscription;
  constructor(public signalrService: SignalrService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.signalrService.stopConnection(); // Отключение при смене роута
      }
    });
  }
  ngOnInit() {
      this.signalrService.startConnection();
    this.subscribeToTournaments();
    // this.SendRequestToServer();

  }
  ngOnDestroy() {
    // this.signalrService.stopConnection();
    this.routerSubscription?.unsubscribe();
  }

  private subscribeToTournaments() {
    this.signalrService.hubConnection.on('ReceiveTournament', async (tournaments: ITournament[]) => {
      this.tournaments$.next(tournaments);
    });
  };
  private SendRequestToServer() {
    this.signalrService.hubConnection.invoke("GetTournaments").then((result) => {
      console.log(result);
    })
      .catch(err => console.error("Ошибка при отправке запроса на сервер" + err));
  }
}
