import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideBarComponent } from './dashboard/side-bar/side-bar.component';
import { TopMenuComponent } from './dashboard/top-menu/top-menu.component';
import { Router, RouterModule } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AjustesComponent } from './dashboard/ajustes/ajustes.component';
import { ContentComponent } from '../administrator/dashboard/content/content.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MaterialsModule } from 'src/app/shared/materials/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FairDocumentsComponent } from '../administrator/dashboard/fair-documents/fair-documents.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SideBarComponent,
    TopMenuComponent,
    AjustesComponent,
    

  ],
  imports: [
    CommonModule,  
    HttpClientModule,
    MaterialsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
    { 
      path: '', 
      component: AjustesComponent,
      children: [
        { path: 'ajustes', component: ContentComponent },
        { path: 'home', component: ContentComponent },
        { path: 'documentation', component: FairDocumentsComponent },
        { path: '**', component: ContentComponent }
      ]
    },
  ]),
]
})

export class AjustesModule { }