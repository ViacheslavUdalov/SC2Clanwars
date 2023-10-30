import {Component, OnInit} from '@angular/core';
import {AllUsersDataService} from "../../../services/all-users-data.service";
import {IUser} from "../../../models/IUser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.less']
})
export class UsersPageComponent implements OnInit{
  users: IUser[];
constructor(private usersData: AllUsersDataService) {
}
ngOnInit() {
this.usersData.GetAllUsers().subscribe(Users => {
  this.users = Users;
  console.log(Users);
})
}

}
