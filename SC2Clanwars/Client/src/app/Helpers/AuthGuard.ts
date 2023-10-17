import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Injectable} from "@angular/core";


@Injectable()
export class AuthGuard implements CanActivate {
  private isAuth: boolean;
  constructor(
              private router: Router,
              private authService: AuthService) {

  }
  // проверяет авторизован ли пользователь по проверке, есть ли в localStorage токен
  // используется в роутинге приложения
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
this.authService.useIsLoggedIn.subscribe(isAuth => {
  this.isAuth = isAuth;
})
    if (this.isAuth) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  };
}
