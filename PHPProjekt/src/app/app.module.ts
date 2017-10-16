import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { UserPageComponent } from './user-page/user-page.component';
import { RecipeComponent } from './user-page/recipe/recipe.component';


const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'user', component: UserPageComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    UserPageComponent,
    RecipeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
