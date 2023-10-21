import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {TokenExpiresService} from "./tokenExpires.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private token: TokenExpiresService) {
    // реализуем обязательно в констуркторе, что эти действия выполнялись при инициализации сервиса
    if (localStorage.getItem('AccessToken')) {
      this.isLoggedIn.next(true);
    }  else if (sessionStorage.getItem('AccessToken')) {
      this.isLoggedIn.next(true);
    }
    else {
      this.isLoggedIn.next(false);
    }
    if (this.token) {
      this.isLoggedIn.next(true);
    }else if (!this.token) {
      this.isLoggedIn.next(false);
    }
  }
  private isLoggedIn= new BehaviorSubject<boolean>(false);
  get useIsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }
  loginWithLocalStorage(token: string, tokenExpires: string, userId: string)
{
  localStorage.setItem('AccessToken', token);
  localStorage.setItem('AccessTokenExpires', tokenExpires);
  localStorage.setItem('userId', userId)
  this.isLoggedIn.next(true);
}
logoutFromLocalStorage() {
  localStorage.removeItem('AccessToken');
  localStorage.removeItem('AccessTokenExpires');
  localStorage.removeItem('userId')
  this.isLoggedIn.next(false);
}
  loginWithSessionStorage(token: string, tokenExpires: string, userId: string)
  {
    sessionStorage.setItem('AccessToken', token);
    sessionStorage.setItem('AccessTokenExpires', tokenExpires);
    localStorage.setItem('userId', userId);
    this.isLoggedIn.next(true);
  }
  logoutFromSessionStorage() {
    sessionStorage.removeItem('AccessToken');
    sessionStorage.removeItem('AccessTokenExpires');
    localStorage.removeItem('userId')
    this.isLoggedIn.next(false);
  }
}
