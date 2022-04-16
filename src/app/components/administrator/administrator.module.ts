import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './dashboard/content/content.component';
import { TopMenuComponent } from './dashboard/top-menu/top-menu.component';
import { SideBarComponent } from './dashboard/side-bar/side-bar.component';
import { MaterialsModule } from 'src/app/shared/materials/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AdministratorComponent } from './administrator.component';
import { FairDocumentsComponent } from './dashboard/fair-documents/fair-documents.component';



@NgModule({
  declarations: [
    TopMenuComponent,
    SideBarComponent,
    ContentComponent,
    AdministratorComponent,
    FairDocumentsComponent,
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
        component: AdministratorComponent,
        children: [
          { path: 'home', component: ContentComponent },
          { path: 'documentation', component: FairDocumentsComponent },
          { path: '**', component: ContentComponent }
        ]
      },
    ]),
  ]
})
export class AdministratorModule { }
