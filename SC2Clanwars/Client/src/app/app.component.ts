import {Component, OnInit} from '@angular/core';
import {TokenExpiresService} from "./services/tokenExpires.service";
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  private isAuth: boolean;
  constructor(private tokenExpiresService: TokenExpiresService,
              private authService: AuthService,
              private router: Router
              ) {
    this.authService.useIsLoggedIn.subscribe((isAuth) => {
      this.isAuth = isAuth;
    });
    if (!this.isAuth) {
      this.router.navigate(['/'])
    }
   }

}
