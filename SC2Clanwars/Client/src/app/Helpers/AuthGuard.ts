import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";


@Injectable()
export class AuthGuard implements CanActivate {
  private isAuth: boolean;
  constructor(
              private router: Router,
              private authService: AuthService) {

  }
  // проверяет авторизован ли пользователь по проверке, есть ли в localStorage токен
  // используется в роутинге приложения
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean{
return this.authService.useIsLoggedIn.pipe(
  map(isAuth => {
    if (isAuth) {
      this.isAuth = true;
      return true;
    } else {
      this.router.navigate(['/login']);
      this.isAuth = false;
      return false;
    }
  })
);
  }
}
