import { Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { MaintenanceRequestComponent } from './maintenance-request/maintenance-request.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/maintenance-request', pathMatch: 'full' },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'maintenance-request', component: MaintenanceRequestComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },

];
