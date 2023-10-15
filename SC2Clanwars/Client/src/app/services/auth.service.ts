import { Injectable } from '@angular/core';
import {IResultSuccessLogin} from "../models/IUser";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  login(token: string)
{
  localStorage.setItem('AccessToken', token);
  this.isLoggedIn = true;
}
logout() {
  localStorage.removeItem('AccessToken');
  this.isLoggedIn = true;
}
get isAuthenticated() : boolean {
    return this.isLoggedIn;
  }
}
