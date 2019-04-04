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
import {ProfileComponent} from './profile/profile.component';
import {AuthGuardService} from './auth-guard.service';
import {HomeComponent} from './home/home.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'stars', component: StarsComponent, children: [
      {path: '', component: StarsWelcomeComponent},
      {path: 'add', component: StarAddComponent, canActivate: [AuthGuardService]},
      {path: 'edit', component: StarEditComponent, canActivate: [AuthGuardService]},
      {path: 'details', component: StarDetailsComponent}
    ]
  },
  {path: 'planets', component: PlanetsComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRouting {
}
