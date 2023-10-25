import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ITournament} from "../models/tournamentModel";
import {BehaviorSubject, Observable} from "rxjs";
import {ITeam} from "../models/teamModel";

@Injectable({
  providedIn: 'root'
})
export class TeamServiceService {
private apiUrl = "http://localhost:5034/api/teams";
private JWTtoken: string | null;
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
      if (localStorage.getItem('AccessToken')) {
        this.JWTtoken = localStorage.getItem('AccessToken');
      } else if (sessionStorage.getItem('AccessToken')) {
        this.JWTtoken = sessionStorage.getItem('AccessToken');
      }
      this.headers = new HttpHeaders({
        'Authorization' : `Bearer ${this.JWTtoken}`
      });
  }
  getTeams(): Observable<ITeam[]>  {
    return this.http.get<ITeam[]>(`${this.apiUrl}`, {headers: this.headers});
  }
  getOneTeam(id: string): Observable<ITeam> {
return this.http.get<ITeam>(`${this.apiUrl}/${id}`, {headers: this.headers})
  }
  createTeam(team: ITeam): Observable<ITeam> {
    return this.http.post<ITeam>(`${this.apiUrl}/create`, team, {headers: this.headers})
  }
  updateTeam(id: string, team: ITeam): Observable<ITeam> {
    return this.http.put<ITeam>(`${this.apiUrl}/update/${team.id}`, team, {headers: this.headers})
  }
  deleteTeam(id: string) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, {headers: this.headers})
  }
}
