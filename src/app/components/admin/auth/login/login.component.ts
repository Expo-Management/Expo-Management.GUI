import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { PersonalInformationService } from 'src/app/shared/services/personal-information.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', {
      validators: [
        Validators.required
      ]
    }),
    password: new FormControl('', {
      validators: Validators.required
    })
  });

  constructor(
    private authService: AuthService,
    private token: TokenStorageService,
    private user_info: PersonalInformationService,
    private customPopUpService: CustomPopUpService
  ) {}

  openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'User login', 
      message,
      'auth/login'
      );
  }

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  onSubmit() {
    this.authService.login(
      this.loginForm.controls['username'].value,
      this.loginForm.controls['password'].value).subscribe(
        data => {
          console.log(data)
          this.token.saveToken(data.token);
          this.user_info.saveRole(
            data.role
          )
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.reloadPage();
        },
        err => {
          console.log(err)
          if (err.status === 404) {
            this.errorMessage = 'No server found!';
            this.openCustomPopUp('No server found!');
            this.isLoginFailed = true;
          } else {
            this.errorMessage = err.error.message;
            this.openCustomPopUp(this.errorMessage);
            this.isLoginFailed = true;
          }
        }
      );
  }

  reloadPage() {
    window.location.reload();
  }

  ngOnInit() {
    console.log(localStorage);
  }
}