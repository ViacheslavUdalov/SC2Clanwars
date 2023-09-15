import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, of, tap, throttle, throwError} from "rxjs";
import {ITournament} from "../models/tournamentModel";
import {ErrorService} from "./error.service";
import {catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TournamentsService {
  private apiURL = "https://localhost/5064/api/tournaments";

  constructor(
    private http: HttpClient,
    private errorServices: ErrorService
  ) {
  }

  tournaments: ITournament[] = []

  createTournament(tournament: ITournament): Observable<ITournament> {
    return this.http.post<ITournament>(this.apiURL, tournament).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('An error occurred:', error);
        return of({} as ITournament
        )
      })
    )
  }
}
