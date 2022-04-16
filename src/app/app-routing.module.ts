import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule)},
  { path: 'administrator', loadChildren: () => import('./components/administrator/administrator.module').then(m => m.AdministratorModule)},
  { path: 'student', loadChildren: () => import('./components/students/students.module').then(m => m.StudentsModule)},
  // { path: 'professor', component: DashboardComponent },
  // { path: 'judge', component: DashboardComponent },

  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '**', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
