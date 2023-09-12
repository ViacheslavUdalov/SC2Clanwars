import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TournamentsPageComponent} from "./components/pages/tournaments-page/tournaments-page.component";
import {AboutPageComponent} from "./components/pages/about-page/about-page.component";
import {HomePageComponent} from "./components/pages/home-page/home-page.component";
import {UsersPageComponent} from "./components/pages/users-page/users-page.component";
import {TeamsPageComponent} from "./components/pages/teams-page/teams-page.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'tournaments', component: TournamentsPageComponent},
  {path: 'about', component: AboutPageComponent},
  {path: 'users', component: UsersPageComponent},
  {path: 'teams', component: TeamsPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
