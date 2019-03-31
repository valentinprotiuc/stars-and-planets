import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../authentication.service';

@Component({
  selector: 'app-stars-welcome',
  templateUrl: './stars-welcome.component.html',
  styleUrls: ['./stars-welcome.component.css']
})
export class StarsWelcomeComponent implements OnInit {

  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
  }

}
