import {Component, OnInit} from '@angular/core';
import {TokenExpiresService} from "./services/tokenExpires.service";
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {AllUsersDataService} from "./services/all-users-data.service";
import {IUser} from "./models/IUser";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  private isAuth: boolean;
 private userId = localStorage.getItem('userId') || sessionStorage.getItem('userId') || '';
 private currentUser : IUser;
  constructor(private tokenExpiresService: TokenExpiresService,
              private authService: AuthService,
              private router: Router,
              private allUsersData: AllUsersDataService
              ) {
    this.authService.useIsLoggedIn.subscribe((isAuth) => {
      this.isAuth = isAuth;
      console.log( this.isAuth)
    });
    if (!this.isAuth) {
      this.router.navigate(['/'])
    }
  }
  ngOnInit() {
    this.allUsersData.GetOneCurrentOwnerUser(this.userId).subscribe((user: IUser) => {
      this.currentUser  = user;
    })
  }
}
