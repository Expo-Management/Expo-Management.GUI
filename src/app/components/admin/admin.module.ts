import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MaterialsModule } from 'src/app/shared/materials/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { LoggedInGuard } from 'src/app/shared/guards/logged-in.guard';
import { ForgetPasswordComponent } from '../admin/auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from '../admin/auth/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
     ForgetPasswordComponent,
     ResetPasswordComponent
  ],
  imports: [
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
          { path: 'forget-password', component: ForgetPasswordComponent},
          { path: 'reset-password', component: ResetPasswordComponent},
        ],
      },
    ]),
  ]
})
export class AdminModule { }
