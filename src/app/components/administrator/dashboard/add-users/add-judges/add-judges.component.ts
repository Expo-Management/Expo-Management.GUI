import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { JudgesService } from 'src/app/shared/services/judges.service';

//error validations when sumitted
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-add-judges',
  templateUrl: './add-judges.component.html',
  styleUrls: ['./add-judges.component.css']
})

export class AddJudgesComponent implements OnInit {

  createJudgeForm = new FormGroup({
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
    private judgesService: JudgesService,
    private customPopUpService: CustomPopUpService
  ) { }

  openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'Judge creation', 
      message,
      'administrator/manage-judges'
      );
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.judgesService.addJudge(
      this.createJudgeForm.controls['IdFormControl'].value,
      this.createJudgeForm.controls['UsernameFormControl'].value,
      this.createJudgeForm.controls['NameFormControl'].value,
      this.createJudgeForm.controls['LastFormControl'].value,
      this.createJudgeForm.controls['EmailFormControl'].value,
      this.createJudgeForm.controls['PhoneFormControl'].value,
      this.createJudgeForm.controls['PasswordFormControl'].value,
    ).subscribe(
      data => {
        this.openCustomPopUp('Judge created!');
      },
      err => {
        if (err.status === 200) {
          this.openCustomPopUp('Judge created!');
        } else {
          this.openCustomPopUp('There was a problem creating the judge, check the information or try again later.');
        }
      }
    );
  }

}
