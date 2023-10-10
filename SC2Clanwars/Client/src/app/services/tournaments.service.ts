import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, Observable, of } from "rxjs";
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
getOneTournament(_id: string) : Observable<ITournament>  {
  return this.http.get<ITournament>(`${this.apiURL}/${_id}`)
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
  updateTournament(id: string, tournament: ITournament): Observable<ITournament> {
  return this.http.put<ITournament>(`${this.apiURL}/update/${tournament.id}`, tournament).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('An error occurred:', error);
      return of({} as ITournament
      )
    })
  )
  }
  deleteTournament(id: string) {
  return this.http.delete(`${this.apiURL}/delete/${id}`)
    // .pipe(
    // catchError((error: HttpErrorResponse) => {
    //   console.error('An error occurred:', error);
    //   return of({} as ITournament
    //   );
    // })
  // )
  }
}
