import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { isThisSecond } from 'date-fns';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { PersonalInformationService } from 'src/app/shared/services/personal-information.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { environment } from 'src/environments/environment';


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
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(5)
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
    console.log('test');
    this.authService.login(
      this.loginForm.controls['username'].value,
      this.loginForm.controls['password'].value).subscribe(
        data => {
          console.log(data)

          if (data.emailConfirmed) {
            this.token.saveAccessToken(data.token);
            this.token.saveRefreshToken(data.refreshToken)
            this.user_info.saveRole(data.role)
            this.user_info.saveEmail(data.email)
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.reloadPage();
          } else {
            this.errorMessage = 'Por favor confirma la cuenta, revisa el nombre de usuario o contacta con algún administrador.';
            this.openCustomPopUp(this.errorMessage);
          }
        },
        err => {
          console.log(err)
          if (err.status == 401) {
            this.errorMessage = 'El usuario no existe. Contacta a algún administrador para crear tu cuenta!';
            this.isLoginFailed = true;
          } else if (err.status === 404) {
            this.errorMessage = 'Error de servidor';
            this.isLoginFailed = true;
          } else {
            this.errorMessage = 'Hay un error con las credenciales, revisa el correo de confirmación o contacta a algún administrador.';
            this.isLoginFailed = true;
          }
          this.openCustomPopUp(this.errorMessage);
        }
      );
  }

  public errorValidator = (controlName: string, errorName: string) =>{
    return this.loginForm.controls[controlName].hasError(errorName);
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
    this.onSubmit()
  }
}