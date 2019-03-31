import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthenticationService, TokenPayload} from '../../authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  credentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    this.credentials.email = form.value.email;
    this.credentials.name = form.value.name;
    this.credentials.password = form.value.password;
    this.auth.register(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('/profile');
      },
      (error) => {
        throw error;
      },
    );
  }
}
