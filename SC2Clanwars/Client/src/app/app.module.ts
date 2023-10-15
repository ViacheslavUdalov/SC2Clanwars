import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { GlobalErrorComponent } from './components/global-error/global-error.component';
import {FormsModule} from "@angular/forms";
import { NavigationComponent } from './components/navigation/navigation.component';
import { TeamsPageComponent } from './components/pages/teams-page/teams-page.component';
import {AboutPageComponent} from "./components/pages/about-page/about-page.component";
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { UsersPageComponent } from './components/pages/users-page/users-page.component';
import { LoadingPipe } from './components/Helpers/loading.pipe';
import { CreateTournamentComponent } from './components/pages/create-tournament/create-tournament.component';
import {TournamentsPageComponent} from "./components/pages/tournaments-page/tournaments-page.component";
import { TournamentPageComponent } from './components/pages/tournament-page/tournament-page.component';
import { AuthenticationPageComponent } from './components/pages/authentication-page/authentication-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import {AuthGuard} from "./Helpers/AuthGuard";

@NgModule({
  declarations: [
    AppComponent,
    GlobalErrorComponent,
    AboutPageComponent,
    NavigationComponent,
  TournamentsPageComponent,
    TournamentPageComponent,
  TeamsPageComponent,
    HomePageComponent,
    UsersPageComponent,
    LoadingPipe,
    CreateTournamentComponent,
    TournamentPageComponent,
    AuthenticationPageComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
