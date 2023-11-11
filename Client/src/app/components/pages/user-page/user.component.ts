import {Component, OnInit} from '@angular/core';
import {AllUsersDataService} from "../../../services/all-users-data.service";
import {IUser} from "../../../models/IUser";
import {ActivatedRoute, Router} from "@angular/router";
import {ChatUsersService} from "../../../services/chat-users.service";

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
              private route: ActivatedRoute,
              private router: Router,
              private usersChat: ChatUsersService) {
   this.LocalId = localStorage.getItem('userId') || sessionStorage.getItem('userId') || '';

    console.log(this.isOwner)
  }

  ngOnInit() {
    // this.usersChat.startConnection();
    this.route.paramMap.subscribe(params => {
      this.Userid = params.get('id');
      if (this.LocalId == this.Userid) {
        // console.log(this.LocalId);
        // console.log(this.Userid)
        this.isOwner = true;
        // console.log(this.isOwner)
      } else {
        this.isOwner = false;
      }
      // console.log(this.Userid);
      if (this.Userid) {
        this.allUserService.GetOneUser(this.Userid).subscribe(user => {
          this.user = user;
        })
      }
    })
}
  GoToChatWithUser() {
    this.router.navigate([`/user/${this.Userid}/chat`])
  }

  protected readonly outerWidth = outerWidth;
}
