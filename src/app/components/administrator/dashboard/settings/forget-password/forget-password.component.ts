import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  ForgetPasswordForm = new FormGroup({
    EmailFormControl: new FormControl('', {
      validators: [
        Validators.required
      ]
    })
 });
  
  constructor(
    private authService: AuthService,
    private token: TokenStorageService,
    private customPopUpService: CustomPopUpService
  ) { }

  Message = '';

  ngOnInit(): void {
    console.log(localStorage);
  }

  onSubmit(){
    console.log('test');
    this.authService.ForgetPassword(
      this.ForgetPasswordForm.controls['EmailFormControl'].value).subscribe(
        data => {
          console.log(data)
          this.Message = 'Se ha enviado el correo de cambio de contraseña!';
          this.openCustomPopUp('Se ha enviado el correo de cambio de contraseña');
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
      'administrator/forget-password'
      );
  }

}
