import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StarsComponent} from './stars/stars.component';
import {PlanetsComponent} from './planets/planets.component';
import {StarsWelcomeComponent} from './stars/stars-welcome/stars-welcome.component';
import {StarEditComponent} from './stars/star-edit/star-edit.component';
import {StarDetailsComponent} from './stars/star-details/star-details.component';
import {StarAddComponent} from './stars/star-add/star-add.component';
import {SignupComponent} from './auth/signup/signup.component';
import {SigninComponent} from './auth/signin/signin.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/stars', pathMatch: 'full'},
  {
    path: 'stars', component: StarsComponent, children: [
      {path: '', component: StarsWelcomeComponent},
      {path: 'add', component: StarAddComponent},
      {path: 'edit', component: StarEditComponent},
      {path: 'details', component: StarDetailsComponent}
    ]
  },
  {path: 'planets', component: PlanetsComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRouting {
}
