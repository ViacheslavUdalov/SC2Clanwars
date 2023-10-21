import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IUser} from "../models/IUser";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AllUsersDataService {
  private ApiUrl: string = "http://localhost:5034/api/users";
  private JWTtoken: string | null;
  private headers: HttpHeaders;
 constructor(private http: HttpClient)
 {
   if (localStorage.getItem('AccessToken')) {
     this.JWTtoken = localStorage.getItem('AccessToken');
   } else if (sessionStorage.getItem('AccessToken')) {
     this.JWTtoken = sessionStorage.getItem('AccessToken');
   }
   this.headers = new HttpHeaders({
     'Authorization' : `Bearer ${this.JWTtoken}`
   })
 }
 GetAllUsers(): Observable<IUser[]> {
   return this.http.get<IUser[]>(`${this.ApiUrl}/getallusers`, {headers: this.headers});
 }
 GetOneUser(id: string): Observable<IUser> {
   return this.http.get<IUser>(`${this.ApiUrl}/getoneuser/${id}`, {headers: this.headers});
 }
 UpdateDateOfUser(id: string, user: IUser) : Observable<IUser> {
   return this.http.put<IUser>(`${this.ApiUrl}/update/${id}`, user, {headers: this.headers})
 }
}
