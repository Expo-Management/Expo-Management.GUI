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
import { MentionsComponent } from './dashboard/mentions/mentions.component';
import { ClaimsComponent } from './dashboard/project-details/claims/claims.component';
import { QualificationComponent } from './dashboard/project-details/qualification/qualification.component';
import { RecommendationsComponent } from './dashboard/recommendations/recommendations.component';
import { ResetPasswordComponent } from './dashboard/settings/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './dashboard/settings/forget-password/forget-password.component';
import { ProjectsComponent } from './dashboard/projects/projects.component';
import { EditEventComponent } from './dashboard/edit-event/edit-event.component';
import { FairCalendarComponent } from './dashboard/fair-calendar/fair-calendar.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

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
    MentionsComponent,
    ClaimsComponent,
    QualificationComponent,
    RecommendationsComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
    ProjectsComponent,
    EditEventComponent,
    FairCalendarComponent
  ],
  imports: [
    ReactiveFormsModule,
    NgxFileDropModule,
    HttpClientModule,
    MaterialsModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    RouterModule.forChild([
      { 
        path: '', 
        component: StudentsComponent,
        children: [
          { path: 'home', component: CurrentProyectProposalsComponent },
          { path: 'security-protocols', component: ProtocolListComponent },
          { path: 'fair-calendar', component: FairCalendarComponent },
          { path: 'past-projects', component: PastProyectProposalsComponent },
          { path: 'current-projects', component: CurrentProyectProposalsComponent },
          { path: 'project-group', component: ProjectGroupComponent },
          { path: 'project/:project_id', component: ProjectDetailsComponent },
          { path: 'new-project', component: CreateProjectComponent },
          { path: 'fair-documents', component: DocumentationComponent },
          { path: 'saved-documents', component: CurrentDocumentationComponent },
          { path: 'project-mentions', component: MentionsComponent },
          { path: 'settings', component: SettingsComponent },
          { path: 'forget-password', component: ForgetPasswordComponent },
          { path: 'reset-password', component: ResetPasswordComponent },
          { path: 'projects/:project_id', component: ProjectsComponent },
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: '**', redirectTo: 'home', pathMatch: 'full' }
        ],
        // canActivate: [ LoggedInGuard ]
      },
    ]),
  ],
  entryComponents: [ ClaimsComponent ]
})
export class StudentsModule { }
