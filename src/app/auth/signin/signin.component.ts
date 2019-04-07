import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthenticationService, TokenPayload} from '../../authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  validationForm: FormGroup;

  credentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router, public fb: FormBuilder) {
    this.validationForm = fb.group({
      emailFormEx: [null, [Validators.required, Validators.email]],
      passwordFormEx: [null, Validators.required],
    });
  }

  get emailFormEx() { return this.validationForm.get('emailFormEx'); }
  get passwordFormEx() { return this.validationForm.get('passwordFormEx'); }

  ngOnInit() {
  }

  onSubmit() {

    this.credentials.email = this.emailFormEx.value;
    this.credentials.password = this.passwordFormEx.value;
    console.log('Cred: ', this.credentials);
    console.log('Em: ', this.emailFormEx);
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
