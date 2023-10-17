import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {TokenExpiresService} from "./tokenExpires.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private token: TokenExpiresService) {
  }

  private isLoggedIn= new BehaviorSubject<boolean>(false);
  setAuth() {
    if (this.token.isTokenExpired()) {
      this.isLoggedIn.next(true);
    } else {
      this.isLoggedIn.next(false);
    }
  }
  get useIsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }
  loginWithLocalStorage(token: string, tokenExpires: string)
{
  localStorage.setItem('AccessToken', token);
  localStorage.setItem('AccessTokenExpires', tokenExpires)
  this.isLoggedIn.next(true);
}
logoutFromLocalStorage() {
  localStorage.removeItem('AccessToken');
  localStorage.removeItem('AccessTokenExpires')
  this.isLoggedIn.next(false);
}
  loginWithSessionStorage(token: string, tokenExpires: string)
  {
    sessionStorage.setItem('AccessToken', token);
    sessionStorage.setItem('AccessTokenExpires', tokenExpires)
    this.isLoggedIn.next(true);
  }
  logoutFromSessionStorage() {
    sessionStorage.removeItem('AccessToken');
    sessionStorage.removeItem('AccessTokenExpires')
    this.isLoggedIn.next(false);
  }
}
