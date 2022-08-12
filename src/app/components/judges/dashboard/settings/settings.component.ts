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
          console.log(err);
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
          this.openCustomPopUp('Juez actualizado exitosamente!');
        },
        err => {
          console.log(err);
          this.openCustomPopUp('Ha ocurrido un error. Por favor, verifique el correo electrónico.');
        }
      )
    }

  logout(){
    this.tokenStorage.signOut();
  }

}
