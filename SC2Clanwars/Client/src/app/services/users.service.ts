import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser} from "../models/IUser";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
private ApiUrl = "http://localhost:5034/api/authentication";
  constructor(private http: HttpClient) { }

  Registration(user: IUser) {
    return this.http.post<IUser>(this.ApiUrl, user)
  }
}
