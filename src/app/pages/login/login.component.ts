import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public get login(): AbstractControl {
    return this.loginForm.controls.login;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: [
        '', // default value of control
        Validators.compose([
          Validators.required,
          Validators.minLength(8)
        ])
      ],
      password: [
        '', // default value of control
        Validators.compose([
          Validators.required,
          Validators.minLength(4)
        ])
      ],
    });
  }

  public doLogin(): void {
    alert("you're logged in")
  }
}
