import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthenticationService, TokenPayload} from '../../authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  credentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  onSignin(form: NgForm) {

    this.credentials.email = form.value.email;
    this.credentials.name = form.value.name;
    this.credentials.password = form.value.password;
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('/profile');
      },
      (error) => {
        throw error;
      },
    );
  }
}
