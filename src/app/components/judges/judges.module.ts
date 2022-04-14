import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JudgesComponent } from './judges.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideBarComponent } from './dashboard/side-bar/side-bar.component';
import { TopMenuComponent } from './dashboard/top-menu/top-menu.component';



@NgModule({
  declarations: [
    JudgesComponent,
    DashboardComponent,
    SideBarComponent,
    TopMenuComponent
  ],
  imports: [
    CommonModule
  ]
})
export class JudgesModule { }
