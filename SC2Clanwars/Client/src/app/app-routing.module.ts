import {Component, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TournamentComponent} from "./components/tournament/tournament.component";
import {AboutPageComponent} from "./pages/about-page/about-page.component";
import {TournamentsPageComponent} from "./pages/tournaments-page/tournaments-page.component";

const routes: Routes = [
  {path: '', component: TournamentsPageComponent},
  {path: 'about', component: AboutPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
