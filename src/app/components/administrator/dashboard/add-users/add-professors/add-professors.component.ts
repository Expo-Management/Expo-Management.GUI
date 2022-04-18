import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

//error validations when sumitted
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-professors',
  templateUrl: './add-professors.component.html',
  styleUrls: ['./add-professors.component.css']
})
export class AddProfessorsComponent implements OnInit {
  NameFormControl = new FormControl('', [Validators.required, Validators.required]);
  LastFormControl = new FormControl('', [Validators.required, Validators.required]);
  EmailFormControl = new FormControl('', [Validators.required, Validators.email]);
  PasswordFormControl = new FormControl('', [Validators.required, Validators.required]);
  IdFormControl = new FormControl('', [Validators.required, Validators.required]);

  matcher = new MyErrorStateMatcher();
  constructor() { }

  ngOnInit(): void {
  }

}
