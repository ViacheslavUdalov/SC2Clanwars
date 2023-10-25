import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ModalWindowService} from "../../services/modal-window.service";
import {AllUsersDataService} from "../../services/all-users-data.service";
import {IUser} from "../../models/IUser";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less']
})
export class NavigationComponent implements OnInit{
  isAuth : boolean;
  currentUser: IUser;
  userId: string;
constructor(private authService: AuthService,
private modalWindow: ModalWindowService,
           private allUserService: AllUsersDataService) {
  this.authService.useIsLoggedIn.subscribe(isAuth => {
    this.isAuth = isAuth;
  });
  if (localStorage.getItem('userId') ) {
    this.userId = localStorage.getItem('userId') as string;
    this.isAuth = true;
  }
  if (sessionStorage.getItem('userId')) {
    this.userId = localStorage.getItem('userId') as string;
    this.isAuth = true;
  }
  if (localStorage.getItem('AccessToken') || sessionStorage.getItem('AccessToken') ) {
this.isAuth = true;
  } else {
    this.isAuth = false;
  }
}
  ngOnInit() {
    if (localStorage.getItem('userId')) {
      this.allUserService.GetOneUser(this.userId).subscribe(user => {
this.currentUser = user;
        this.isAuth = true;
      })
    }
    else {
      this.isAuth = false;
    }

  }
  Logout() {
    if (localStorage.getItem('AccessToken')) {
      this.authService.logoutFromLocalStorage()
    } else if (sessionStorage.getItem('AccessToken')) {
      this.authService.logoutFromSessionStorage();
    }

}

}
// (mouseenter)="showModal($event)"
// [ngClass]="{'inactive-link' : !tokenExist}"
