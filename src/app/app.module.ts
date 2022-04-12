import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './shared/materials/materials.module';
import { DashboardComponent } from './components/administrator/dashboard/dashboard.component';
import { TopMenuComponent } from './components/administrator/dashboard/top-menu/top-menu.component';
import { SideBarComponent } from './components/administrator/dashboard/side-bar/side-bar.component';
import { ContentComponent } from './components/administrator/dashboard/content/content.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TopMenuComponent,
    SideBarComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    MaterialsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
