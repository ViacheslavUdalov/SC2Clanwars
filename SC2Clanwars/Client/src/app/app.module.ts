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
import {TournamentsPageComponent} from "./components/pages/tournaments-page/tournaments-page.component";
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { UsersPageComponent } from './components/pages/users-page/users-page.component';
import { LoadingPipe } from './components/Helpers/loading.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GlobalErrorComponent,
    TournamentsPageComponent,
    AboutPageComponent,
    NavigationComponent,
    TeamsPageComponent,
    HomePageComponent,
    UsersPageComponent,
    LoadingPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
