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
        Validators.required
      ]
    }),
    LastFormControl: new FormControl('', {
      validators: [
        Validators.required
      ]
    }),
    UsernameFormControl: new FormControl('', {
      validators: [
        Validators.required
      ]
    }),
    PhoneFormControl: new FormControl('', {
      validators: [
        Validators.required
      ]
    }),
    EmailFormControl: new FormControl('', {
      validators: [
        Validators.required
      ]
    }),
    PasswordFormControl: new FormControl('', {
      validators: [
        Validators.required
      ]
    }),
    IdFormControl: new FormControl('', {
      validators: [
        Validators.required
      ]
    }),
  })
  
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
      this.createStudentForm.controls['PhoneFormControl'].value,
      this.createStudentForm.controls['PasswordFormControl'].value,
    ).subscribe(
      data => {
        this.openCustomPopUp('Estudiante creado!');
      },
      err => {
        if (err.status === 200) {
          this.openCustomPopUp('Estudiante creado!');
        } else {
          this.openCustomPopUp('Hubo un problema creando el usuario, intente mas tarde!');
        }
      }
    );
  }

}
