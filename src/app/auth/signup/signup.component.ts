import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthenticationService, TokenPayload} from '../../authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  validationForm: FormGroup;

  credentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router, public fb: FormBuilder) {
    this.validationForm = fb.group({
      nameFormEx: [null, Validators.required],
      emailFormEx: [null, [Validators.required, Validators.email]],
      passwordFormEx: [null, Validators.required]
    });
  }

  get nameFormEx() {
    return this.validationForm.get('nameFormEx');
  }

  get emailFormEx() {
    return this.validationForm.get('emailFormEx');
  }

  get passwordFormEx() {
    return this.validationForm.get('passwordFormEx');
  }

  ngOnInit() {
  }

  onSubmit() {
    this.credentials.name = this.validationForm.value.name;
    this.credentials.email = this.validationForm.value.email;
    this.credentials.password = this.validationForm.value.password;
    console.log('Cred: ', this.credentials);
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
