import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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

  tokenCaptcha: string | undefined;

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
  ) {
    this.tokenCaptcha = undefined;
  }

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

          if (data.emailConfirmed) {
            this.token.saveToken(data.token);
            this.user_info.saveRole(data.role)
            this.user_info.saveEmail(data.email)
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.reloadPage();
          } else {
            this.errorMessage = 'Please confirm the account, check the email or contact the administrator.';
            this.openCustomPopUp(this.errorMessage);
          }
        },
        err => {
          console.log(err)
          if (err.status == 401) {
            this.errorMessage = 'User does not exists, contact the administrator to create an account!';
            this.isLoginFailed = true;
          } else if (err.status === 404) {
            this.errorMessage = 'No server found!';
            this.isLoginFailed = true;
          } else {
            this.errorMessage = 'There is a problem with the credentials provided, contact administration';
            this.isLoginFailed = true;
          }
          this.openCustomPopUp(this.errorMessage);
        }
      );
  }

  reloadPage() {
    window.location.reload();
  }

  ngOnInit() {
    console.log(localStorage);
  }

  public send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

    console.debug(`Token [${this.token}] generated`);
  }
}