import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JudgesComponent } from './judges.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideBarComponent } from './dashboard/side-bar/side-bar.component';
import { TopMenuComponent } from './dashboard/top-menu/top-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialsModule } from 'src/app/shared/materials/materials.module';
import { HttpClientModule } from '@angular/common/http';
import { ProjectsListComponent } from './dashboard/projects-list/projects-list.component';



@NgModule({
  declarations: [
    JudgesComponent,
    DashboardComponent,
    SideBarComponent,
    TopMenuComponent,
    ProjectsListComponent
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
        component: JudgesComponent,
        children: [
          { path: 'home', component: ProjectsListComponent },
          /*{ path: 'documentation', component: FairDocumentsComponent },
          { path: '**', component: ContentComponent }*/
        ]
      },
    ]),
  ]
})
export class JudgesModule { }
