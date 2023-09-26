import { Component } from '@angular/core';
import {IUser} from "../../../models/IUser";
import {UsersService} from "../../../services/users.service";

@Component({
  selector: 'app-authentication-page',
  templateUrl: './authentication-page.component.html',
  styleUrls: ['./authentication-page.component.less']
})
export class AuthenticationPageComponent {
User: IUser = {
  Name: "",
  Email: "",
  Password: ""
};
constructor(private usersService : UsersService) {}
onSubmit() {
  this.usersService.Registration(this.User).subscribe((CreatedUser: IUser) => {
    this.User = CreatedUser;
  })
}
}
