import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-maintenance-request',
  templateUrl: './maintenance-request.component.html',
  styleUrls: ['./maintenance-request.component.css']
})
export class MaintenanceRequestComponent {
  maintenanceForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.maintenanceForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      unitNumber: ['', Validators.required],
      serviceType: ['', Validators.required],
      summary: ['', Validators.required],
      details: ['']
    });
  }

  onSubmit() {
    debugger;
    if (this.maintenanceForm.valid) {
      const formData = {
        ...this.maintenanceForm.value,
        status: 'open'
      };
      this.http.post('http://localhost:5000/api/maintenance-requests', formData)
        .subscribe(
          (response) => {
            console.log('Request successful', response);
            this.maintenanceForm.reset();
            alert('Maintenance request submitted successfully!');
          },
          (error) => {
            console.error('Error submitting request', error);
            alert('Failed to submit the maintenance request.');
          }
        );
    }else{
      alert("Kindly Fill All The Details")
    }
  }
}
