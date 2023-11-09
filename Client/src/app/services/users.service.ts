import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ILogin, IRegister, IResultSuccessLogin, IUser, ResultSuccessRegister} from "../models/IUser";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
private ApiUrl = "http://localhost:5034/api/authentication";
  constructor(private http: HttpClient) { }

  Registration(user: IRegister) {
    return this.http.post<ResultSuccessRegister>(`${this.ApiUrl}/register`, user)
  }
  Login(user: ILogin) {
    return this.http.post<IResultSuccessLogin>(`${this.ApiUrl}/login`, user)
  }
}
