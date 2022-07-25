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
import { ContactStudentsPopupComponent } from './dashboard/contact-students-popup/contact-students-popup.component';
import { ProjectsListComponent } from './dashboard/projects-list/projects-list.component';
import { ProjectToQualifyDetailsComponent } from './dashboard/project-to-qualify-details/project-to-qualify-details.component';
import { QualifyProjectComponent } from './dashboard/qualify-project/qualify-project.component';
import { RecomendationsPopupComponent } from './dashboard/recomendations-popup/recomendations-popup.component';
import { ListComponent } from './dashboard/list/list.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { LoggedInGuard } from 'src/app/shared/guards/logged-in.guard';
import { StudentsListComponent } from './dashboard/students-list/students-list.component';


@NgModule({
 
  declarations: [
    JudgesComponent,
    DashboardComponent,
    SideBarComponent,
    TopMenuComponent,
    ProjectsListComponent,
    ProjectToQualifyDetailsComponent,
    QualifyProjectComponent,
    RecomendationsPopupComponent,
    ContactStudentsPopupComponent,
    ListComponent,
    TopMenuComponent,
    SettingsComponent,
    StudentsListComponent
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
          { path: 'students', component: StudentsListComponent},
          { path: 'home', component: ProjectsListComponent },
          { path: 'list-project', component: ProjectsListComponent },
          { path: 'project-details/:project_id', component: ProjectToQualifyDetailsComponent },
          { path: 'project-qualify/:project_id', component: QualifyProjectComponent },
          { path: 'list', component: ListComponent },
          { path: 'settings', component: SettingsComponent },
          { path: '**', component: ProjectsListComponent },
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: '**', redirectTo: 'home', pathMatch: 'full' }
        ],
        // canActivate: [ LoggedInGuard ]
      },
    ]),
  ],
})
export class JudgesModule { }
