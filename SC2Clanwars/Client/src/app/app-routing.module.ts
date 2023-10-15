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

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'tournaments', component: TournamentsPageComponent, canActivate: [AuthGuard]},
  {path: 'about', component: AboutPageComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersPageComponent, canActivate: [AuthGuard]},
  {path: 'teams', component: TeamsPageComponent, canActivate: [AuthGuard]},
  {path: 'create-tournament', component: CreateTournamentComponent, canActivate: [AuthGuard]},
  {path: 'create-tournament/:id', component: CreateTournamentComponent, canActivate: [AuthGuard]},
  {path: 'tournaments/:id', component: TournamentPageComponent, canActivate: [AuthGuard]},
  {path: 'tournaments/:id', component: TournamentPageComponent, canActivate: [AuthGuard]},
  {path: 'registration', component: AuthenticationPageComponent},
  {path: 'login', component: LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
