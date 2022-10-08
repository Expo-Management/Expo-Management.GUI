import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { JudgesService } from 'src/app/shared/services/judges.service';


@Component({
  selector: 'app-add-judges',
  templateUrl: './add-judges.component.html',
  styleUrls: ['./add-judges.component.css']
})

export class AddJudgesComponent implements OnInit {

  createJudgeForm = new FormGroup({
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
        Validators.minLength(10)
      ]
    }),
    IdFormControl: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(9),
        Validators.minLength(9),
        Validators.pattern("^((\\+91-?)|0)?[0-9]{9}$")
      ]
    }),
    InstitutionFormControl: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(50),
      ]
    }),
    PositionFormControl: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(30),
      ]
    }),
  })

  public errorValidator = (controlName: string, errorName: string) =>{
    return this.createJudgeForm.controls[controlName].hasError(errorName);
  }

  constructor(
    private judgesService: JudgesService,
    private customPopUpService: CustomPopUpService
  ) { }

  openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'Registro de jueces', 
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
      this.createJudgeForm.controls['InstitutionFormControl'].value,
      this.createJudgeForm.controls['PositionFormControl'].value,
    ).subscribe(
      data => {
        this.openCustomPopUp('¡Juez creado!');
      },
      err => {
        if (err.status === 200) {
          this.openCustomPopUp('¡Juez creado!');
        } else if (err.status === 403) {
          this.openCustomPopUp('Inicie sesión con una cuenta de Administrador para acceder a esta sección.');
        } else {
          this.openCustomPopUp('Ocurrió un problema registrando al juez.');
        }
      }
    );
  }

}
