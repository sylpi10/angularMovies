import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  public get login(): AbstractControl {
    return this.loginForm.controls.login;
  }
 
  public get password(): AbstractControl {
    return this.loginForm.controls.password;
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
    //local persistence of user
    if (this.userService.authentificate(this.loginForm.value)) {
      this.router.navigate(['home']);
    }else{
      //TODO : some snackbar to keep user informed
      this.snackBar.open( 'Authentification failed',
      '',
      {
        duration: 2600,
      });
      // TODO : redraw form with empty values
      this.login.setValue('');
      this.password.setValue('');
    }
  }
}
