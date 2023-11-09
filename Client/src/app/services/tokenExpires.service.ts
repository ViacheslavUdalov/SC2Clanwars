import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenExpiresService {
  isTokenExpired(): boolean {
    const tokenLocalExpires = localStorage.getItem('AccessTokenExpires');
    // const tokenSessionExpires = localStorage.getItem('AccessTokenExpires');
    if (!tokenLocalExpires) {
      return false;
    }
    const expires = new Date(tokenLocalExpires);
    const DateNow = new Date();
  return expires > DateNow;
  };
}
