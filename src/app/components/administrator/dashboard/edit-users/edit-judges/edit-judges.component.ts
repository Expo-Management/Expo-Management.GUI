import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { JudgesService } from 'src/app/shared/services/judges.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-judges',
  templateUrl: './edit-judges.component.html',
  styleUrls: ['./edit-judges.component.css']
})
export class EditJudgesComponent implements OnInit {
  judge_email = ''
  temp_phone_number = ''

  judgeForm = new FormGroup({
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
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
        Validators.minLength(5)
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
    })
  });

  public errorValidator = (controlName: string, errorName: string) =>{
    return this.judgeForm.controls[controlName].hasError(errorName);
  }

  matcher = new MyErrorStateMatcher();
  constructor(
    private _activatedRoute: ActivatedRoute,
    private judgeService: JudgesService,
    private customPopUpService: CustomPopUpService
  ) { }

  openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'Judge update', 
      message,
      'administrator/manage-judges'
      );
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(
      params => {
        this.judge_email = params.get('judge_email')!;
      });

    this.judgeService.getJudge(this.judge_email).subscribe(
      data => {
        console.log(data);
        this.judgeForm.controls['NameFormControl'].setValue(data.name);
        this.judgeForm.controls['LastFormControl'].setValue(data.lastname);
        this.judgeForm.controls['EmailFormControl'].setValue(data.email);
        this.judgeForm.controls['UsernameFormControl'].setValue(data.userName);
        this.judgeForm.controls['PhoneFormControl'].setValue(data.phoneNumber);
      }
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
        this.openCustomPopUp('¡Juez actualizado exitosamente');
      },
      err => {
        console.log(err);
        this.openCustomPopUp('Error al actualizar el juez. Por favor verifíque el correo electrónico');
      }
    )
  }

}
