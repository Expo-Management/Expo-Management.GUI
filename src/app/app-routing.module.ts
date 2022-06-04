import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoggedInGuard } from './shared/guards/logged-in.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule), canActivate: [ LoggedInGuard ]},
  { 
    path: 'administrator', 
    loadChildren: () => import('./components/administrator/administrator.module').then(m => m.AdministratorModule), 
    canActivate: [ AuthGuard ],
    data: {
      role: 'Admin'
    }
  },
  { 
    path: 'student', 
    loadChildren: () => import('./components/students/students.module').then(m => m.StudentsModule), 
    canActivate: [ AuthGuard ],
    data: {
      role: 'Student'
    }
  },
  { 
    path: 'judges', 
    loadChildren: () => import('./components/judges/judges.module').then(m => m.JudgesModule), 
    canActivate: [ AuthGuard ],
    data: {
      role: 'Judge'
    }
  },

  { path: '', redirectTo: 'administrator', pathMatch: 'full' },
  { path: '**', component: AdministratorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
