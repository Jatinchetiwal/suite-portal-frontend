import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'] 
})
export class AdminDashboardComponent implements OnInit {
  maintenanceRequests: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchMaintenanceRequests();
  }

  fetchMaintenanceRequests() {
    this.http.get<any[]>('http://localhost:5000/api/maintenance-requests')
      .subscribe(
        (data) => {
          this.maintenanceRequests = data;
        },
        (error) => {
          console.error('Error fetching maintenance requests', error);
        }
      );
  }

  markAsClosed(requestId: string) {
    this.http.put(`http://localhost:5000/api/maintenance-requests/${requestId}/close`, {})
      .subscribe(
        () => {
          this.fetchMaintenanceRequests();
        },
        (error) => {
          console.error('Error closing request', error);
        }
      );
  }
}
