import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './shared/materials/materials.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CustomPopUpComponent } from './shared/components/custom-pop-up/custom-pop-up.component';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './shared/services/jwt.interceptor';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ConfirmationPopUpComponent } from './shared/components/confirmation-pop-up/confirmation-pop-up.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomPopUpComponent,
    ConfirmationPopUpComponent
  ],
  imports: [
    MatToolbarModule,
    BrowserModule,
    MatDialogModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    NgbModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
