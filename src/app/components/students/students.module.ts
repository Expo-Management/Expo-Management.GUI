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
import { CreateProjectComponent } from './dashboard/create-project/create-project.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ProjectGroupComponent } from './dashboard/project-group/project-group.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { DocumentationComponent } from './dashboard/documentation/documentation.component';
import { CurrentDocumentationComponent } from './dashboard/current-documentation/current-documentation.component';


@NgModule({
  declarations: [
    StudentsComponent,
    SideBarComponent,
    TopMenuComponent,
    ContentComponent,
    ProtocolListComponent,
    PastProyectProposalsComponent,
    CurrentProyectProposalsComponent,
    ProjectDetailsComponent,
    CreateProjectComponent,
    ProjectGroupComponent,
    SettingsComponent,
    DocumentationComponent,
    CurrentDocumentationComponent,
  ],
  imports: [
    ReactiveFormsModule,
    NgxFileDropModule,
    HttpClientModule,
    MaterialsModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { 
        path: '', 
        component: StudentsComponent,
        children: [
          { path: 'home', component: ProjectDetailsComponent },
          { path: 'security-protocols', component: ProtocolListComponent },
          { path: 'past-projects', component: PastProyectProposalsComponent },
          { path: 'current-projects', component: CurrentProyectProposalsComponent },
          { path: 'project-group', component: ProjectGroupComponent },
          { path: 'project/:project_id', component: ProjectDetailsComponent },
          { path: 'new-project', component: CreateProjectComponent },
          { path: 'fair-documents', component: DocumentationComponent },
          { path: 'saved-documents', component: CurrentDocumentationComponent },
          { path: 'settings', component: SettingsComponent },
          { path: '**', component: ProjectDetailsComponent }
        ]
      },
    ]),
  ]
})
export class StudentsModule { }
