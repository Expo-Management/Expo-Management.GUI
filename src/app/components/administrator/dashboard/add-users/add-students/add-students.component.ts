import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css']
})

export class AddStudentsComponent implements OnInit {
  createStudentForm = new FormGroup({
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
    return this.createStudentForm.controls[controlName].hasError(errorName);
  }

  constructor(
    private studentService: StudentsService,
    private customPopUpService: CustomPopUpService
  ) { }

  openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'Creación del estudiante', 
      message,
      'administrator/manage-students'
      );
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.studentService.addStudent(
      this.createStudentForm.controls['IdFormControl'].value,
      this.createStudentForm.controls['UsernameFormControl'].value,
      this.createStudentForm.controls['NameFormControl'].value,
      this.createStudentForm.controls['LastFormControl'].value,
      this.createStudentForm.controls['EmailFormControl'].value,
      this.createStudentForm.controls['PhoneFormControl'].value
    ).subscribe(
      data => {
        this.openCustomPopUp('Estudiante creado!');
      },
      err => {
        if (err.status === 200) {
          this.openCustomPopUp('Estudiante creado!');
        } else {
          this.openCustomPopUp('Ocurrio un error creando el estudiante.');
        }
      }
    );
  }

}
