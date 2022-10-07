import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AdminService } from 'src/app/shared/services/admin.service';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';

//error validations when sumitted
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-professors',
  templateUrl: './add-professors.component.html',
  styleUrls: ['./add-professors.component.css']
})
export class AddProfessorsComponent implements OnInit {
  createProfessorForm = new FormGroup({
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
    UsernameFormControl: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(5)
      ]
    }),
    PhoneFormControl: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(8),
        Validators.minLength(8),
        Validators.pattern("^((\\+91-?)|0)?[0-9]{8}$")
      ]
    }),
    EmailFormControl: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        Validators.maxLength(100),
        Validators.minLength(5)
      ]
    }),
    IdFormControl: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(9),
        Validators.minLength(9),
      ]
    }),
  })

  public errorValidator = (controlName: string, errorName: string) =>{
    return this.createProfessorForm.controls[controlName].hasError(errorName);
  }
  
  constructor(
    private adminService: AdminService,
    private customPopUpService: CustomPopUpService
  ) { }

  openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'Configuración de profesor', 
      message,
      'administrator/manage-professors'
      );
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.adminService.addProfesor(
      this.createProfessorForm.controls['IdFormControl'].value,
      this.createProfessorForm.controls['UsernameFormControl'].value,
      this.createProfessorForm.controls['NameFormControl'].value,
      this.createProfessorForm.controls['LastFormControl'].value,
      this.createProfessorForm.controls['EmailFormControl'].value,
      this.createProfessorForm.controls['PhoneFormControl'].value
    //,this.createProfessorForm.controls['PasswordFormControl'].value
    ).subscribe(
      data => {
        this.openCustomPopUp('Profesor creado!');
      },
      err => {
        if (err.status === 200) {
          this.openCustomPopUp('Profesor creado!');
        } else {
          this.openCustomPopUp('Hubo un problema creando el usuario, intente mas tarde!');
        }
      }
    );
  }
}
