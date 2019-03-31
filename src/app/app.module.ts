import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {AccordionModule, BsDropdownModule, CollapseModule, TooltipModule} from 'ngx-bootstrap';
import {NavigationComponent} from './navigation/navigation.component';
import {StarsComponent} from './stars/stars.component';
import {PlanetsComponent} from './planets/planets.component';
import {AppRouting} from './app-routing.module';
import {StarDetailsComponent} from './stars/star-details/star-details.component';
import {StarItemComponent} from './stars/star-item/star-item.component';
import {StarEditComponent} from './stars/star-edit/star-edit.component';
import {StarsNavComponent} from './stars/stars-nav/stars-nav.component';
import {StarsWelcomeComponent} from './stars/stars-welcome/stars-welcome.component';
import {StarAddComponent} from './stars/star-add/star-add.component';
import {HttpClientModule} from '@angular/common/http';
import {ServerService} from './server.service';
import {StarService} from './stars/star.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SigninComponent} from './auth/signin/signin.component';
import {SignupComponent} from './auth/signup/signup.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    StarsComponent,
    PlanetsComponent,
    StarDetailsComponent,
    StarItemComponent,
    StarEditComponent,
    StarsNavComponent,
    StarsWelcomeComponent,
    StarAddComponent,
    SigninComponent,
    SignupComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    AccordionModule.forRoot(),
    AppRouting,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ServerService, StarService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
