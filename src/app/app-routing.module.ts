import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { AdminAccessGuard } from './shared/guards/admin-access.guard';
import { AuthGuard } from './shared/guards/auth.guard';
import { JudgeAccessGuard } from './shared/guards/judge-access.guard';
import { LoggedInGuard } from './shared/guards/logged-in.guard';
import { StudentAccessGuard } from './shared/guards/student-access.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule), canActivate: [ LoggedInGuard ]},
  { 
    path: 'administrator', 
    loadChildren: () => import('./components/administrator/administrator.module').then(m => m.AdministratorModule), 
    canActivate: [ AuthGuard, AdminAccessGuard ]
  },
  { 
    path: 'student', 
    loadChildren: () => import('./components/students/students.module').then(m => m.StudentsModule), 
    canActivate: [ AuthGuard, StudentAccessGuard ],
  },
  { 
    path: 'judges', 
    loadChildren: () => import('./components/judges/judges.module').then(m => m.JudgesModule), 
    canActivate: [ AuthGuard,  ],
  },

  { path: '', redirectTo: 'administrator', pathMatch: 'full' },
  { path: '**', component: AdministratorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
