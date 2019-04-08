import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthenticationService) {
  }

  ngOnInit() {
  }

  get status() {
    return this.auth.isLoggedIn();
  }

  get name() {
    return this.auth.getUserDetails().name;
  }

}
