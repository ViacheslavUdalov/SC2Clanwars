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
export class NavigationComponent implements OnInit {
  isAuth: boolean;
  currentUser: IUser;
  userId: string;

  constructor(
    private authService: AuthService,
    private modalWindow: ModalWindowService,
    private allUserService: AllUsersDataService) {
    this.authService.useIsLoggedIn.subscribe(isAuth => {
      this.isAuth = isAuth;
    });
    this.isAuth = !!(localStorage.getItem('userId') || sessionStorage.getItem('userId'));
    this.userId = localStorage.getItem('userId') || sessionStorage.getItem('userId') || '';
  }

  ngOnInit() {
    // console.log(this.currentUser);
    if (this.userId) {
      this.allUserService.GetOneUser(this.userId).subscribe(user => {
        this.currentUser = user;
        // console.log(this.currentUser)

      })
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
