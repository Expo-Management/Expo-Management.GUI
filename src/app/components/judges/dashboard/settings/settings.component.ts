import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { JudgesService } from 'src/app/shared/services/judges.service';
import { PersonalInformationService } from 'src/app/shared/services/personal-information.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  isJudge = true
  
  judgeForm = new FormGroup({
    PhoneFormControl: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(8),
        Validators.minLength(8),
        Validators.pattern("^((\\+91-?)|0)?[0-9]{8}$")
      ]
    }),
    NameFormControl: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(3)
      ]
    }),
    LastFormControl: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(10)
      ]
    }),
    EmailFormControl: new FormControl('', {
      validators: [
        Validators.required
      ]
    }),
    UsernameFormControl: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(5)
      ]
    })
  });

  public errorValidator = (controlName: string, errorName: string) =>{
    return this.judgeForm.controls[controlName].hasError(errorName);
  }

  constructor(
    private judgeService: JudgesService,
    private customPopUpService: CustomPopUpService,
    private personalInfo: PersonalInformationService,
    private tokenStorage: TokenStorageService) { }

    openCustomPopUp(message: string) {
      this.customPopUpService.confirm(
        'Ajustes', 
        message,
        'judges'
        );
    }

    ngOnInit(): void {
      this.judgeService.getJudge(this.personalInfo.getEmail()).subscribe(
        data => {
          this.judgeForm.controls['PhoneFormControl'].setValue(data.phoneNumber);
          this.judgeForm.controls['NameFormControl'].setValue(data.name);
          this.judgeForm.controls['LastFormControl'].setValue(data.lastname);
          this.judgeForm.controls['EmailFormControl'].setValue(data.email);
          this.judgeForm.controls['UsernameFormControl'].setValue(data.userName);
        },
        err => {
          if (err.status === 403) {
            this.openCustomPopUp('Inicie sesión con una cuenta de Juez para acceder a esta sección.');
          } else {
            this.openCustomPopUp('Ocurrió un problema interno. Por favor, vuelve a intentarlo más tarde.');
          }
        },
      )
    }

    onSubmit() {
      this.judgeService.updateJudge(
        this.judgeForm.controls['NameFormControl'].value,
        this.judgeForm.controls['LastFormControl'].value,
        this.judgeForm.controls['EmailFormControl'].value,
        this.judgeForm.controls['UsernameFormControl'].value,
        this.judgeForm.controls['PhoneFormControl'].value
      ).subscribe(
        data => {
          this.openCustomPopUp('¡Información actualizada exitosamente!');
        },
        err => {
          console.log(err);
          this.openCustomPopUp('Ha ocurrido un error.');
        }
      )
    }

  logout(){
    this.tokenStorage.signOut();
  }

}
