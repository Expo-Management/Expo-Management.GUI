import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AdminService } from 'src/app/shared/services/admin.service';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { PersonalInformationService } from 'src/app/shared/services/personal-information.service';
import { StudentsService } from 'src/app/shared/services/students.service';
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
  
  studentForm = new FormGroup({
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
    return this.studentForm.controls[controlName].hasError(errorName);
  }

  constructor(
    private studentService: StudentsService,
    private customPopUpService: CustomPopUpService,
    private personalInfo: PersonalInformationService,
    private tokenStorage: TokenStorageService) { }

    ngOnInit(): void {
      this.studentService.getStudent(this.personalInfo.getEmail()).subscribe(
        data => {
          this.studentForm.controls['PhoneFormControl'].setValue(data.phoneNumber);
          this.studentForm.controls['NameFormControl'].setValue(data.name);
          this.studentForm.controls['LastFormControl'].setValue(data.lastname);
          this.studentForm.controls['EmailFormControl'].setValue(data.email);
          this.studentForm.controls['UsernameFormControl'].setValue(data.userName);
        },
        err => {
          console.log(err);
          if (err.status === 403) {
            this.openCustomPopUp('Inicie sesión con una cuenta de Estudiante para acceder a esta sección.');
          } else {
            this.openCustomPopUp('Ocurrió un problema interno. Por favor, vuelve a intentarlo más tarde.');
          }
        },
      )
    }


  logout(){
    this.tokenStorage.signOut();
  }

  onSubmit() {
    this.studentService.updateStudent(
      this.studentForm.controls['NameFormControl'].value,
      this.studentForm.controls['LastFormControl'].value,
      this.studentForm.controls['EmailFormControl'].value,
      this.studentForm.controls['UsernameFormControl'].value,
      this.studentForm.controls['PhoneFormControl'].value
    ).subscribe(
      data => {
        this.openCustomPopUp('¡Información actualizada exitosamente!');
      },
      err => {
        console.log(err);
        this.openCustomPopUp('Ha ocurrido un error.');
        if (err.status === 403) {
          this.openCustomPopUp('Inicie sesión con una cuenta de Estudiante para acceder a esta sección.');
        } else {
          this.openCustomPopUp('Ocurrió un problema interno. Por favor, vuelve a intentarlo más tarde.');
        }
      }
    )
  }

  openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'Ajustes', 
      message,
      'student'
      );
  }

}
