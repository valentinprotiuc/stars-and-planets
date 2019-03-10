import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StarsComponent} from './stars/stars.component';
import {PlanetsComponent} from './planets/planets.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/stars', pathMatch: 'full'},
  {path: 'stars', component: StarsComponent},
  {path: 'planets', component: PlanetsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRouting {
}
