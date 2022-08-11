import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
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
  NameFormControl = new FormControl('', [Validators.required, Validators.required]);
  LastFormControl = new FormControl('', [Validators.required, Validators.required]);
  EmailFormControl = new FormControl('', [Validators.required, Validators.email]);
  PhoneFormControl = new FormControl('', [Validators.required, Validators.required]);
  IdFormControl = new FormControl('', [Validators.required, Validators.required]);

  matcher = new MyErrorStateMatcher();

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }

  logout(){
    this.tokenStorage.signOut();
  }
}
