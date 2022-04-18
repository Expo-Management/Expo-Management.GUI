import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './shared/materials/materials.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    BrowserModule,
    MaterialsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
