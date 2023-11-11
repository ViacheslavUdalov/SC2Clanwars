import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {TokenExpiresService} from "./tokenExpires.service";
import {IUser} from "../models/IUser";
import {AllUsersDataService} from "./all-users-data.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId: string
  constructor(private token: TokenExpiresService,
              private allUsersData: AllUsersDataService,
              private router: Router) {
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
  this.allUsersData.GetOneCurrentOwnerUser(userId).subscribe((user: IUser) => {
    console.log(user);
  });
}
logoutFromLocalStorage() {
  localStorage.clear();
  this.isLoggedIn$.next(false);
  this.router.navigate(['/']);
}
  loginWithSessionStorage(token: string, tokenExpires: string, userId: string)
  {
    sessionStorage.setItem('AccessToken', token);
    sessionStorage.setItem('AccessTokenExpires', tokenExpires);
     sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('isLoggedIn', 'true');
    this.isLoggedIn$.next(true)
    this.allUsersData.GetOneCurrentOwnerUser(userId).subscribe((user: IUser) => {
      console.log(user);
    });
  }
  logoutFromSessionStorage() {
    sessionStorage.clear();
    this.isLoggedIn$.next(false);
    this.router.navigate(['/']);
  }
  checkIsThereUserIdInBothStorage() {
    if (localStorage.getItem('AccessToken') && sessionStorage.getItem('AccessToken')) {
      localStorage.clear();
      sessionStorage.clear();
    }
  }

}
