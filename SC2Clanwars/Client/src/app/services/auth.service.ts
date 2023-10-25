import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {TokenExpiresService} from "./tokenExpires.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public UserId$ = new BehaviorSubject<string>('');
  constructor(private token: TokenExpiresService) {
    // реализуем обязательно в констуркторе, что эти действия выполнялись при инициализации сервиса
    if (localStorage.getItem('AccessToken')) {
      this.isLoggedIn$.next(true);
    }  else if (sessionStorage.getItem('AccessToken')) {
      this.isLoggedIn$.next(true);
    }
    else {
      this.isLoggedIn$.next(false);
    }
    this.checkIsThereUserIdInBothStorage();
  }
  public isLoggedIn$= new BehaviorSubject<boolean>(false);
  get useIsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }
  loginWithLocalStorage(token: string, tokenExpires: string, userId: string)
{
  localStorage.setItem('AccessToken', token);
  localStorage.setItem('AccessTokenExpires', tokenExpires);
  localStorage.setItem('userId', userId);
  localStorage.setItem('isLoggedIn', 'true');
  this.isLoggedIn$.next(true);
}
logoutFromLocalStorage() {
  localStorage.clear();
  this.isLoggedIn$.next(false);
}
  loginWithSessionStorage(token: string, tokenExpires: string, userId: string)
  {
    sessionStorage.setItem('AccessToken', token);
    sessionStorage.setItem('AccessTokenExpires', tokenExpires);
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('isLoggedIn', 'true');
    this.isLoggedIn$.next(true);
  }
  logoutFromSessionStorage() {
    sessionStorage.clear();
    this.isLoggedIn$.next(false);
  }
  checkIsThereUserIdInBothStorage() {
    if (localStorage.getItem('userId')) {
      this.UserId$.next(localStorage.getItem('userId') as string)
    }
    if (sessionStorage.getItem('userId')) {
      this.UserId$.next(sessionStorage.getItem('userId') as string)
    }
    if (localStorage.getItem('AccessToken') && sessionStorage.getItem('AccessToken')) {
      localStorage.clear();
      sessionStorage.clear();
    }
  }

}
