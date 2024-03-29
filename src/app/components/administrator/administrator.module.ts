import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './dashboard/content/content.component';
import { TopMenuComponent } from './dashboard/top-menu/top-menu.component';
import { SideBarComponent } from './dashboard/side-bar/side-bar.component';
import { MaterialsModule } from 'src/app/shared/materials/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxFileDropModule } from 'ngx-file-drop';
//pages
import { AdministratorComponent } from './administrator.component';
import { FairDocumentsComponent } from './dashboard/fair-documents/fair-documents.component';
import { AddFileComponent } from './dashboard/fair-documents/add-file/add-file.component';
import { FairCategoriesComponent } from './dashboard/fair-categories/fair-categories.component';
import { AddCategoryComponent } from './dashboard/fair-categories/add-category/add-category.component';
import { FairCalendarComponent } from './dashboard/fair-calendar/fair-calendar.component';
import { CreateAppointmentsComponent } from './dashboard/create-appointments/create-appointments.component';
//settings
import { SettingsComponent } from './dashboard/settings/settings.component';
import { ForgetPasswordComponent } from './dashboard/settings/forget-password/forget-password.component';
import { ResetPasswordComponent } from './dashboard/settings/reset-password/reset-password.component';
//calendar imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
//User administration
import { ManageJudgesComponent } from './dashboard/manage-users/manage-judges/manage-judges.component';
import { ManageStudentsComponent } from './dashboard/manage-users/manage-students/manage-students.component';
import { ManageProfessorsComponent } from './dashboard/manage-users/manage-professors/manage-professors.component';
import { AddJudgesComponent } from './dashboard/add-users/add-judges/add-judges.component';
import { AddStudentsComponent } from './dashboard/add-users/add-students/add-students.component';
import { AddProfessorsComponent } from './dashboard/add-users/add-professors/add-professors.component';
import { EditJudgesComponent } from './dashboard/edit-users/edit-judges/edit-judges.component';
import { EditStudentsComponent } from './dashboard/edit-users/edit-students/edit-students.component';
import { EditProfessorsComponent } from './dashboard/edit-users/edit-professors/edit-professors.component';
//dialogs
import { DeleteDialogComponent } from './dashboard/delete-dialog/delete-dialog.component';
import { LoggedInGuard } from 'src/app/shared/guards/logged-in.guard';
import { LogsComponent } from './dashboard/logs/logs.component';
import { MatNativeDateModule } from '@angular/material/core';
import { FairProtocolsComponent } from './dashboard/fair-protocols/fair-protocols.component';
import { AddProtocolComponent } from './dashboard/fair-protocols/add-protocol/add-protocol.component';
import { EditEventComponent } from './dashboard/edit-event/edit-event.component';
import { FairKindEventsComponent } from './dashboard/fair-kind-events/fair-kind-events.component';
import { AddKindEventComponent } from './dashboard/fair-kind-events/add-kind-event/add-kind-event.component';


@NgModule({
  declarations: [
    TopMenuComponent,
    SideBarComponent,
    //fair stuff
    ContentComponent,
    AdministratorComponent,
    FairDocumentsComponent,
    AddFileComponent,
    FairCategoriesComponent,
    AddCategoryComponent,
    FairProtocolsComponent,
    FairCalendarComponent,
    CreateAppointmentsComponent,
    SettingsComponent,
    LogsComponent,
    //manage users
    ManageStudentsComponent,
    ManageJudgesComponent,
    ManageProfessorsComponent,
    //add users
    AddStudentsComponent,
    AddJudgesComponent,
    AddProfessorsComponent,
    //edit users
    EditStudentsComponent,
    EditJudgesComponent,
    EditProfessorsComponent,
    //dialogs
    DeleteDialogComponent,
    AddProtocolComponent,
    EditEventComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    FairKindEventsComponent,
    AddKindEventComponent
    
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
        component: AdministratorComponent,
        children: [
          //fair stuff
          { path: 'home', component: ContentComponent },
          { path: 'fair-documents', component: FairDocumentsComponent },
          { path: 'fair-categories', component: FairCategoriesComponent },
          { path: 'fair-kind-events', component: FairKindEventsComponent },
          { path: 'fair-protocols', component: FairProtocolsComponent },
          { path: 'fair-calendar', component: FairCalendarComponent },
          { path: 'logs', component: LogsComponent},
          //manage users
          { path: 'manage-students', component: ManageStudentsComponent },
          { path: 'manage-judges', component: ManageJudgesComponent },
          { path: 'manage-professors', component: ManageProfessorsComponent },
          //add users
          { path: 'add-students', component: AddStudentsComponent },
          { path: 'add-judges', component: AddJudgesComponent },
          { path: 'add-professors', component: AddProfessorsComponent },
          //edit users
          { path: 'edit-students/:student_email', component: EditStudentsComponent },
          { path: 'edit-judges/:judge_email', component: EditJudgesComponent },

          { path: 'edit-professors', component: EditProfessorsComponent },
          { path: 'settings', component: SettingsComponent },         

          { path: 'edit-professors/:admin_email', component: EditProfessorsComponent },
          { path: 'settings', component: SettingsComponent },
          
          { path: 'forget-password', component: ForgetPasswordComponent},
          { path: 'reset-password', component: ResetPasswordComponent},

          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: '**', redirectTo: 'home', pathMatch: 'full' }
        ]
      },
    ]),
    //calendar imports
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [
    
  ]
})
export class AdministratorModule { }
