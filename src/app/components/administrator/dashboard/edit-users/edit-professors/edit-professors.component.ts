import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core'; import { ActivatedRoute } from '@angular/router';
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
        Validators.required,
        Validators.maxLength(8),
        Validators.minLength(8),
        Validators.pattern("^((\\+91-?)|0)?[0-9]{8}$")
      ]
    }),
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
        Validators.minLength(10)
      ]
    }),
    UsernameFormControl: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(5)
      ]
    })
  });

  public errorValidator = (controlName: string, errorName: string) => {
    return this.adminForm.controls[controlName].hasError(errorName);
  }

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
        this.adminForm.controls['NameFormControl'].setValue(data.data.name);
        this.adminForm.controls['LastFormControl'].setValue(data.data.lastname);
        this.adminForm.controls['EmailFormControl'].setValue(data.data.email);
        this.adminForm.controls['UsernameFormControl'].setValue(data.data.userName);
        this.adminForm.controls['PhoneFormControl'].setValue(data.data.phoneNumber);
      },
      err => {
        if (err.status === 403) {
          this.openCustomPopUp('Inicie sesión con una cuenta de Administrador para acceder a esta sección.');
        } else if (err.status === 204) {
          this.openCustomPopUp(err.message);
        } else {
          this.openCustomPopUp('Ocurrió un problema interno. Por favor, vuelve a intentarlo más tarde.');
        }
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
      }
      ,
      err => {
        console.log(err);
        if (err.status === 204) {
          this.openCustomPopUp(err.message);
        } else if (err.status === 400) {
          this.openCustomPopUp(err.message);
        } else {
          this.openCustomPopUp('Ocurrió un problema interno. Por favor, vuelve a intentarlo más tarde.');
        }
      }
    )
  }

}
