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
import { LoggedInGuard } from 'src/app/shared/guards/logged-in.guard';
import { MentionsComponent } from './dashboard/mentions/mentions.component';
import { FairNewsComponent } from './dashboard/fair-news/fair-news.component';
import { ClaimsComponent } from './dashboard/project-details/claims/claims.component';
import { QualificationComponent } from './dashboard/project-details/qualification/qualification.component';
import { RecommendationsComponent } from './dashboard/recommendations/recommendations.component';
import { ResetPasswordComponent } from './dashboard/settings/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './dashboard/settings/forget-password/forget-password.component';

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
    FairNewsComponent,
    ClaimsComponent,
    QualificationComponent,
    RecommendationsComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
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
          { path: 'home', component: FairNewsComponent },
          { path: 'security-protocols', component: ProtocolListComponent },
          { path: 'past-projects', component: PastProyectProposalsComponent },
          { path: 'current-projects', component: CurrentProyectProposalsComponent },
          { path: 'project-group', component: ProjectGroupComponent },
          { path: 'project/:project_id', component: ProjectDetailsComponent },
          { path: 'new-project', component: CreateProjectComponent },
          { path: 'fair-documents', component: DocumentationComponent },
          { path: 'fair-news', component: FairNewsComponent },
          { path: 'saved-documents', component: CurrentDocumentationComponent },
          { path: 'project-mentions', component: MentionsComponent },
          { path: 'settings', component: SettingsComponent },
          { path: 'forget-password', component: ForgetPasswordComponent},
          { path: 'reset-password', component: ResetPasswordComponent},
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
