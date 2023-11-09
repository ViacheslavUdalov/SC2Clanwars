import {Component, OnInit} from '@angular/core';
import {TeamServiceService} from "../../../services/team-service.service";
import {Router} from "@angular/router";
import {ITeam} from "../../../models/teamModel";

@Component({
  selector: 'app-teams-page',
  templateUrl: './teams-page.component.html',
  styleUrls: ['./teams-page.component.less']
})
export class TeamsPageComponent implements OnInit {
  teams: ITeam[]
constructor(private teamService: TeamServiceService,
            private router: Router) {
}
ngOnInit() {
  this.teamService.getTeams().subscribe(allteams => {
    this.teams = allteams;
  })
}
}
