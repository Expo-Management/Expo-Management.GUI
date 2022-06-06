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
    }),
    IdFormControl: new FormControl('', {
      validators: [
        Validators.required
      ]
    })
  });

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
        this.judgeForm.controls['IdFormControl'].setValue(data.userId);
        this.temp_phone_number = data.phoneNumber
      }
    )
  }

  onSubmit() {
    this.judgeService.updateJudge(
      this.judgeForm.controls['NameFormControl'].value,
      this.judgeForm.controls['LastFormControl'].value,
      this.judgeForm.controls['EmailFormControl'].value,
      this.judgeForm.controls['UsernameFormControl'].value,
      this.judgeForm.controls['IdFormControl'].value,
      this.temp_phone_number
    ).subscribe(
      data => {
        this.openCustomPopUp('User updated successfully!');
      },
      err => {
        console.log(err);
        this.openCustomPopUp('Error updating the judge, please check the username!');
      }
    )
  }

}
