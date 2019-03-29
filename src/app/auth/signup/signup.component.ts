import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ServerService} from '../../server.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  helpMessage = '';

  constructor(private serverService: ServerService) {
  }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    this.helpMessage = '';

    this.serverService.registerUser({email: form.value.email, password: form.value.password}).subscribe(
      (response) => {
        this.helpMessage = 'Erfolgreich registriert!';
      },
      (error) => {
        this.helpMessage = error.error.text;
      }
    );
  }
}
