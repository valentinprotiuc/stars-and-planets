import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {BsDropdownModule} from 'ngx-bootstrap';
import { NavigationComponent } from './navigation/navigation.component';
import { StarsComponent } from './stars/stars.component';
import { PlanetsComponent } from './planets/planets.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    StarsComponent,
    PlanetsComponent
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
