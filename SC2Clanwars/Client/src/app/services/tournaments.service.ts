import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, Observable, of, tap, throttle, throwError} from "rxjs";
import {ITournament} from "../models/tournamentModel";


@Injectable({
  providedIn: 'root'
})
export class TournamentsService {
  private apiURL = "http://localhost:5034/api/tournaments";

  constructor(
    private http: HttpClient,
  ) {
  }

  tournaments: ITournament[] = [];
getTournaments(): Observable<ITournament[]> {
    return this.http.get<ITournament[]>(this.apiURL);
}
  createTournament(tournament: ITournament): Observable<ITournament> {
    return this.http.post<ITournament>(`${this.apiURL}/create`, tournament)
      .pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('An error occurred:', error);
        return of({} as ITournament
        )
      })
    )
  }
}
