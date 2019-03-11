import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {BsDropdownModule} from 'ngx-bootstrap';
import { NavigationComponent } from './navigation/navigation.component';
import { StarsComponent } from './stars/stars.component';
import { PlanetsComponent } from './planets/planets.component';
import {AppRouting} from './app-routing.module';
import { StarDetailsComponent } from './stars/star-details/star-details.component';
import { StarItemComponent } from './stars/star-item/star-item.component';
import { StarEditComponent } from './stars/star-edit/star-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    StarsComponent,
    PlanetsComponent,
    StarDetailsComponent,
    StarItemComponent,
    StarEditComponent
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    AppRouting
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
