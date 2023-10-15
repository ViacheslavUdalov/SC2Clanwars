import { Component } from '@angular/core';
import {IRegister, IUser, ResultSuccessRegister} from "../../../models/IUser";
import {UsersService} from "../../../services/users.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-authentication-page',
  templateUrl: './authentication-page.component.html',
  styleUrls: ['./authentication-page.component.less']
})
export class AuthenticationPageComponent {
InputUser: IRegister = {
  UserName: "",
  Email: "",
  Password: "",
  ConfirmPassword: "",
  FullName: ""
};
constructor(private usersService : UsersService,
            private router: Router,
            private authService: AuthService) {}
onSubmit() {
  this.usersService.Registration(this.InputUser).subscribe({
  next: (response: ResultSuccessRegister) => {
    console.log(response);
    if (response && response.accessToken) {
     this.authService.login(response.accessToken);
      this.router.navigate(['/']);
    }
  },
    error: err => {
    console.error("Регистрация не прошла", err)
    }})
}
}
