﻿import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, Observable, of } from "rxjs";
import {ITournament} from "../models/tournamentModel";


@Injectable({
  providedIn: 'root'
})
export class TournamentsService {
  private apiURL = "https://localhost:7034/api/tournaments";
private JWTtoken: string | null;
private headers: HttpHeaders;
  constructor(
    private http: HttpClient) {
    if (localStorage.getItem('AccessToken')) {
      this.JWTtoken = localStorage.getItem('AccessToken');
    } else if (sessionStorage.getItem('AccessToken')) {
      this.JWTtoken = sessionStorage.getItem('AccessToken');
    }
   this.headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.JWTtoken}`
    });
  }

getTournaments(): Observable<ITournament[]>  {
  return this.http.get<ITournament[]>(`${this.apiURL}`, {headers: this.headers})
}
getOneTournament(_id: string) : Observable<ITournament>  {
  return this.http.get<ITournament>(`${this.apiURL}/${_id}`, {headers: this.headers})
}
  createTournament(tournament: ITournament): Observable<ITournament> {
    return this.http.post<ITournament>(`${this.apiURL}/create`, tournament, {headers: this.headers})
  }
  updateTournament(id: string, tournament: ITournament): Observable<ITournament> {
  return this.http.put<ITournament>(`${this.apiURL}/update/${tournament.id}`, tournament, {headers: this.headers})

  }
  deleteTournament(id: string) {
  return this.http.delete(`${this.apiURL}/delete/${id}`, {headers: this.headers})
  }
}
