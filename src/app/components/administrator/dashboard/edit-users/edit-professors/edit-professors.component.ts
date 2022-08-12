import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';import { ActivatedRoute } from '@angular/router';
import { CustomPopUpService } from 'src/app/shared/services/custom-pop-up.service';
import { AdminService } from 'src/app/shared/services/admin.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-professors',
  templateUrl: './edit-professors.component.html',
  styleUrls: ['./edit-professors.component.css']
})
export class EditProfessorsComponent implements OnInit {
  admin_email = ''
  temp_phone_number = ''

  adminForm = new FormGroup({
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
    private adminService: AdminService,
    private customPopUpService: CustomPopUpService
    ) { }



  openCustomPopUp(message: string) {
    this.customPopUpService.confirm(
      'Actualizar profesor', 
      message,
      'administrator/manage-professors'
      );
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(
      params => {
        this.admin_email = params.get('admin_email')!;
      });

    this.adminService.getAdmin(this.admin_email).subscribe(
      data => {
        console.log(data);
        this.adminForm.controls['NameFormControl'].setValue(data.name);
        this.adminForm.controls['LastFormControl'].setValue(data.lastname);
        this.adminForm.controls['EmailFormControl'].setValue(data.email);
        this.adminForm.controls['UsernameFormControl'].setValue(data.userName);
        this.adminForm.controls['PhoneFormControl'].setValue(data.phoneNumber);
      }
    )
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
        this.openCustomPopUp('¡Profesor actualizado exitosamente!');
      },
      err => {
        console.log(err);
        this.openCustomPopUp('Erro al actualizar el profesor. ¡Por favor verifique el correo electrónico!');
      }
    )
  }

}
