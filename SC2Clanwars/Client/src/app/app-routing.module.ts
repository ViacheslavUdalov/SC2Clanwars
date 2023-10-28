import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TournamentsPageComponent} from "./components/pages/tournaments-page/tournaments-page.component";
import {AboutPageComponent} from "./components/pages/about-page/about-page.component";
import {HomePageComponent} from "./components/pages/home-page/home-page.component";
import {UsersPageComponent} from "./components/pages/users-page/users-page.component";
import {TeamsPageComponent} from "./components/pages/teams-page/teams-page.component";
import {CreateTournamentComponent} from "./components/pages/create-tournament/create-tournament.component";
import {TournamentPageComponent} from "./components/pages/tournament-page/tournament-page.component";
import {AuthenticationPageComponent} from "./components/pages/authentication-page/authentication-page.component";
import {LoginPageComponent} from "./components/pages/login-page/login-page.component";
import {AuthGuard} from "./Helpers/AuthGuard";
import {UserComponent} from "./components/pages/user-page/user.component";
import {UpdateUserPageComponent} from "./components/pages/update-user-page/update-user-page.component";
import {TeamPageComponent} from "./components/pages/team-page/team-page.component";
import {CreateTeamPageComponent} from "./components/pages/create-team-page/create-team-page.component";
import { ChatPageComponent} from "./components/pages/chat-page/chatpage.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'tournaments', component: TournamentsPageComponent, canActivate: [AuthGuard]},
  {path: 'about', component: AboutPageComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersPageComponent, canActivate: [AuthGuard]},
  {path: 'users/:id', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'teams', component: TeamsPageComponent, canActivate: [AuthGuard]},
  {path: 'teams/:id', component: TeamPageComponent, canActivate: [AuthGuard]},
  {path: 'create-team/:id', component: CreateTeamPageComponent, canActivate: [AuthGuard]},
  {path: 'create-team', component: CreateTeamPageComponent, canActivate: [AuthGuard]},
  {path: 'create-tournament', component: CreateTournamentComponent, canActivate: [AuthGuard]},
  {path: 'create-tournament/:id', component: CreateTournamentComponent, canActivate: [AuthGuard]},
  {path: 'tournaments/:id', component: TournamentPageComponent, canActivate: [AuthGuard]},
  {path: 'tournaments/:id', component: TournamentPageComponent, canActivate: [AuthGuard]},
  {path: 'registration', component: AuthenticationPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'update-user/:id', component: UpdateUserPageComponent, canActivate: [AuthGuard]},
  {path: 'team/:id/chat', component: ChatPageComponent, canActivate: [AuthGuard]},
  {path: 'user/:id/chat', component: ChatPageComponent, canActivate: [AuthGuard]},
  {path: 'tournament/:id/chat', component: ChatPageComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
