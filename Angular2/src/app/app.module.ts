import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { UserPageComponent } from './user-page/user-page.component';
import { LoginComponent } from './landing/login/login.component';
import { RegistrationComponent } from './landing/registration/registration.component';
import {RestService} from "../core/rest.service";
import {SessionService} from "../core/session.service";
import {AuthGuard} from "./auth.guard";


const routes: Routes = [
  { path: '', component: LandingComponent,
    children: [
      {path: 'registration', component: RegistrationComponent},
      {path: 'login', component: LoginComponent},
    ]
  },
  { path: 'user',canActivate: [AuthGuard], component: UserPageComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    UserPageComponent,
    LoginComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [RouterModule, RestService, SessionService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
