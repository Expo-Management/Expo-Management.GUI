import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';



@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  ResetPasswordForm = new FormGroup({

    NewPasswordFormControl: new FormControl('', {
      validators: [
        Validators.required
      ]
    }),
    ConfirmPasswordFormControl: new FormControl('', {
      validators: [
        Validators.required
      ]
    }),
 });

 email: string = "";
 token: string = "";

  constructor(
    private authService: AuthService,
    private customPopUpService: CustomPopUpService,
    private route: ActivatedRoute
  ) { }

  Message = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.token = params['token'];
  });
  // console.log(window.location.search);
  // console.log(this.email);
  // console.log(this.token);
  }

  onSubmit(){
    this.authService.ResetPassword(
      this.token,
      this.email,
      this.ResetPasswordForm.controls['NewPasswordFormControl'].value,
      this.ResetPasswordForm.controls['ConfirmPasswordFormControl'].value
      ).subscribe(
        data => {
          console.log(data)
          this.Message = 'Se ha cambiado la contraseña exitosamente!';
          this.openCustomPopUp('Se ha cambiado la contraseña exitosamente');
         // window.location.hostname;
        },
        err => {
          console.log(err)
          if (err.status === 404) {
            this.Message = 'El servidor no pudo ser encontrado!';
            this.openCustomPopUp('El servidor no pudo ser encontrado');
          } else {
            this.Message = err.error.message;
            this.openCustomPopUp(this.Message);
          }
        }
      );
    }


  openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'Cambio de contraseña', 
      message,
      'administrator/reset-password'
      );
  }
}
