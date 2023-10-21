import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../services/users.service";
import {AllUsersDataService} from "../../../services/all-users-data.service";
import {IUser} from "../../../models/IUser";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit{
  user: IUser;
  isOwner: boolean = false;
  Userid: string | null
  LocalId: string | null
  constructor(private allUserService: AllUsersDataService,
              private route: ActivatedRoute) {
   this.LocalId = localStorage.getItem('userId');

    console.log(this.isOwner)
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.Userid = params.get('id');
      if (this.LocalId == this.Userid) {
        console.log(this.LocalId);
        console.log(this.Userid)
        this.isOwner = true;
        console.log(this.isOwner)
      } else {
        this.isOwner = false;
      }
      console.log(this.Userid);
      if (this.Userid) {
        this.allUserService.GetOneUser(this.Userid).subscribe(user => {
          this.user = user;
        })
      }
    })

}
}
