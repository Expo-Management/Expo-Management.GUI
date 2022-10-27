import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  ResetPasswordForm = new FormGroup({

    NewPasswordFormControl: new FormControl('', {
      validators: [
        Validators.required,
        Validators.max(15),
        Validators.min(8),
        Validators.pattern("(?=^.{8,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*")    
      ]
    }),
    ConfirmPasswordFormControl: new FormControl('', {
      validators: [
        Validators.required,
        Validators.max(15),
        Validators.min(8),
        Validators.pattern("(?=^.{8,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*")    
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
      this.authService.saveEmail(params['email']);
      this.authService.saveToken(params['token']);
  });

  this.email = this.authService.getEmail();
  this.token = this.authService.getToken()!;

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
          this.homePopUp('Se ha cambiado la contraseña exitosamente');
        },  
        err => {
          console.log(err)
          if (err.status === 404) {
            this.Message = 'El servidor no pudo ser encontrado!';
            this.homePopUp('El servidor no pudo ser encontrado');
          }else if(err.status === 400){
            this.Message = err.error.message;
            this.openCustomPopUp(this.Message);
          }else if(err.status === 200){
            this.Message = 'Se ha cambiado la contraseña exitosamente!';
            this.homePopUp('Se ha cambiado la contraseña exitosamente');
          }else{
            this.Message = err.error.message;
            this.openCustomPopUp(this.Message);
          }
        }
      );
    }

  homePopUp(message: string) {
    this.customPopUpService.confirm(
      'Cambio de contraseña', 
      message,
      'administrator/home'
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


