import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialsModule } from 'src/app/shared/materials/materials.module';
import { SideBarComponent } from './dashboard/side-bar/side-bar.component';
import { TopMenuComponent } from './dashboard/top-menu/top-menu.component';
import { ContentComponent } from './dashboard/content/content.component';
import { ProtocolListComponent } from './dashboard/protocol-list/protocol-list.component';
import { PastProyectProposalsComponent } from './dashboard/past-proyect-proposals/past-proyect-proposals.component';
import { CurrentProyectProposalsComponent } from './dashboard/current-proyect-proposals/current-proyect-proposals.component';
import { ProjectDetailsComponent } from './dashboard/project-details/project-details.component';


@NgModule({
  declarations: [
    StudentsComponent,
    SideBarComponent,
    TopMenuComponent,
    ContentComponent,
    ProtocolListComponent,
    PastProyectProposalsComponent,
    CurrentProyectProposalsComponent,
    ProjectDetailsComponent
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
        component: StudentsComponent,
        children: [
          { path: 'home', component: ContentComponent },
          { path: 'security-protocols', component: ProtocolListComponent },
          { path: 'past-projects', component: PastProyectProposalsComponent },
          { path: 'current-projects', component: CurrentProyectProposalsComponent },
          { path: 'project/:project_id', component: ProjectDetailsComponent },
          { path: '**', component: ContentComponent }
        ]
      },
    ]),
  ]
})
export class StudentsModule { }
