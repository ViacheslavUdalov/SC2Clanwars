import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, of, tap, throttle, throwError} from "rxjs";
import {ITournament} from "../models/tournamentModel";
import {ErrorService} from "./error.service";
import {catchError} from 'rxjs/operators';
import {SignalrService} from "./signalr.service";


@Injectable({
  providedIn: 'root'
})
export class TournamentsService {
  private apiURL = "http://localhost:5034/api/tournaments/create";

  constructor(
    private http: HttpClient,
    private errorServices: ErrorService,
    private signalrService: SignalrService
  ) {
  }

  tournaments: ITournament[] = []

  createTournament(tournament: ITournament): Observable<ITournament> {
    return this.http.post<ITournament>(this.apiURL, tournament).pipe(
 // this.signalrService.hubConnection.invoke("GetTournaments").then((res) => console.log(res)).catch(err => console.error(err));
      catchError((error: HttpErrorResponse) => {
        console.error('An error occurred:', error);
        return of({} as ITournament
        )
      })
    )
  }
}
