import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { JudgesService } from 'src/app/shared/services/judges.service';
import { StudentsService } from 'src/app/shared/services/students.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-students',
  templateUrl: './edit-students.component.html',
  styleUrls: ['./edit-students.component.css']
})
export class EditStudentsComponent implements OnInit {
  student_email = ''
  temp_phone_number = ''

  studentForm = new FormGroup({
    PhoneFormControl: new FormControl('', {
      validators: [
        Validators.required
      ]
    }),
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
    EmailFormControl: new FormControl('', {
      validators: [
        Validators.required
      ]
    }),
    UsernameFormControl: new FormControl('', {
      validators: [
        Validators.required
      ]
    })
  });

  matcher = new MyErrorStateMatcher();
  constructor(
    private _activatedRoute: ActivatedRoute,
    private studentService: StudentsService,
    private customPopUpService: CustomPopUpService
  ) { }

  openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'Editar estudiante', 
      message,
      'administrator/manage-students'
      );
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(
      params => {
        this.student_email = params.get('student_email')!;
      });

    this.studentService.getStudent(this.student_email).subscribe(
      data => {
        console.log(data);
        this.studentForm.controls['NameFormControl'].setValue(data.name);
        this.studentForm.controls['LastFormControl'].setValue(data.lastname);
        this.studentForm.controls['EmailFormControl'].setValue(data.email);
        this.studentForm.controls['UsernameFormControl'].setValue(data.userName);
        this.studentForm.controls['PhoneFormControl'].setValue(data.phoneNumber);

      }
    )
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
        this.openCustomPopUp('¡Estudiante actualizado exitosamente!');
      },
      err => {
        console.log(err);
        this.openCustomPopUp('Ha ocurrido un error. Por favor, verifique el correo electrónico.');
      }
    )
  }

}
