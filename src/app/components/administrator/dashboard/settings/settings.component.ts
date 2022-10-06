import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AdminService } from 'src/app/shared/services/admin.service';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
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
  
  adminForm = new FormGroup({
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
    return this.adminForm.controls[controlName].hasError(errorName);
  }

  constructor(
    private adminService: AdminService,
    private customPopUpService: CustomPopUpService,
    private personalInfo: PersonalInformationService,
    private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.adminService.getAdmin(this.personalInfo.getEmail()).subscribe(
      data => {
        this.adminForm.controls['PhoneFormControl'].setValue(data.phoneNumber);
        this.adminForm.controls['NameFormControl'].setValue(data.name);
        this.adminForm.controls['LastFormControl'].setValue(data.lastname);
        this.adminForm.controls['EmailFormControl'].setValue(data.email);
        this.adminForm.controls['UsernameFormControl'].setValue(data.userName);
      },
      err => {
        if (err.status === 403) {
          this.openCustomPopUp('Inicie sesión con una cuenta de Administrador para acceder a esta sección.');
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
    this.adminService.updateAdmin(
      this.adminForm.controls['NameFormControl'].value,
      this.adminForm.controls['LastFormControl'].value,
      this.adminForm.controls['EmailFormControl'].value,
      this.adminForm.controls['UsernameFormControl'].value,
      this.adminForm.controls['PhoneFormControl'].value
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

  openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'Ajustes', 
      message,
      'administrator'
      );
  }
}
