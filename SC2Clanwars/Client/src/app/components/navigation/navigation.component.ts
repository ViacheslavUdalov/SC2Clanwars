import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ModalWindowService} from "../../services/modal-window.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less']
})
export class NavigationComponent {
  isAuth : boolean;
constructor(private authService: AuthService,
private modalWindow: ModalWindowService) {
  this.authService.useIsLoggedIn.subscribe(isAuth => {
    this.isAuth = isAuth;
  });
  if (localStorage.getItem('AccessToken') || sessionStorage.getItem('AccessToken')) {
this.isAuth = true;
  } else {
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
