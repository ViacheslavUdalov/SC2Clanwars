import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, Observable, tap, throttle, throwError} from "rxjs";
import {ITournament} from "../models/tournamentModel";
import {ErrorService} from "./error.service";


@Injectable({
  providedIn: 'root'
})
export class TournamentsService {
  constructor(
    private http: HttpClient,
    private errorServices: ErrorService
  ) {
  }
tournaments: ITournament[] = []
  getALL(): Observable<ITournament[]> {
    return this.http.get<ITournament[]>('http://localhost:3000/tournaments', {
      params: new HttpParams().append('limit', 5)
    }).pipe(
      tap(tournaments => this.tournaments = tournaments),
      catchError(this.errorHandler.bind(this))
    )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorServices.handle(error.message)
    return throwError(() => error.message)
  }
}
