import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MaterialsModule } from 'src/app/shared/materials/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ForgetPasswordComponent } from '../administrator/dashboard/settings/forget-password/forget-password.component';
import { ResetPasswordComponent } from '../administrator/dashboard/settings/reset-password/reset-password.component';

import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';

import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
     ForgetPasswordComponent,
     ResetPasswordComponent
  ],
  imports: [
    FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,

    ReactiveFormsModule,
    HttpClientModule,
    MaterialsModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { 
        path: '', 
        component: AuthComponent,
        children: [
          { path: 'login', component: LoginComponent },
        ],
      },
    ]),
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.siteKey
      } as RecaptchaSettings,
    }
  ]
})
export class AdminModule { }
