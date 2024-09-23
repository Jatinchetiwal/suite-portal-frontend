import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { MaintenanceRequestComponent } from './maintenance-request/maintenance-request.component';
import { appRoutes } from './app-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component'; // Update path if necessary

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    MaintenanceRequestComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
