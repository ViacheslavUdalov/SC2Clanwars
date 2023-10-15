import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Injectable} from "@angular/core";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  // проверяет авторизован ли пользователь по проверке, есть ли в localStorage токен
  // используется в роутинге приложения
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  if (this.authService.isAuthenticated) {
    return true;
  } else {
    this.router.navigate(['/']);
    return false;
  }
  };
}
