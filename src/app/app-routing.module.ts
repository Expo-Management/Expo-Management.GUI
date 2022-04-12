import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/administrator/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule)},
  { path: 'home', component: DashboardComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
