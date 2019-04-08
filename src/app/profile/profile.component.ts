import {Component, OnInit} from '@angular/core';
import {AuthenticationService, UserDetails} from '../authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  details: UserDetails;

  constructor(private auth: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['']);
  }

}
