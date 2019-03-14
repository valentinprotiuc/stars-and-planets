import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StarsComponent} from './stars/stars.component';
import {PlanetsComponent} from './planets/planets.component';
import {StarsWelcomeComponent} from './stars/stars-welcome/stars-welcome.component';
import {StarEditComponent} from './stars/star-edit/star-edit.component';
import {StarDetailsComponent} from './stars/star-details/star-details.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/stars', pathMatch: 'full'},
  {path: 'stars', component: StarsComponent, children: [
      {path: '', component: StarsWelcomeComponent},
      {path: 'add', component: StarEditComponent},
      {path: 'edit', component: StarEditComponent},
      {path: 'details', component: StarDetailsComponent}
    ]},
  {path: 'planets', component: PlanetsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRouting {
}
