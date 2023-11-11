import { Component } from '@angular/core';
import {ILogin, IResultSuccessLogin} from "../../../models/IUser";
import {UsersService} from "../../../services/users.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {AllUsersDataService} from "../../../services/all-users-data.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent {
  User: ILogin = {
    Email: "",
    Password: "",
    RememberMe: false
  };
  private rememberMe: boolean;
  constructor(private usersService : UsersService,
              private router: Router,
              private authService: AuthService              ) {}
  onSubmit() {
    this.usersService.Login(this.User).subscribe({
      next: (response: IResultSuccessLogin) => {
        console.log(response);
        if (response && response.accessToken) {
          if (this.rememberMe) {
            this.authService.loginWithLocalStorage(response.accessToken, response.accessTokenExpires, response.userId);
          } else {
            this.authService.loginWithSessionStorage(response.accessToken, response.accessTokenExpires, response.userId);
          }
          this.router.navigate(['/']);
        }
      },
      error: err => {
        console.error("Не удалось войти в аккаунт", err)
      }})
  }
  onRememberMe(rememberMe: boolean) {
    if (rememberMe) {
this.rememberMe = true;
    } else {
      this.rememberMe = false;
    }
  }
}
