import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient,  private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    debugger;
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.http.post('http://localhost:5000/api/auth/login', loginData)
        .subscribe(
          (response: any) => {
            console.log('Login successful', response);
            alert('Login successful!');
            localStorage.setItem('authToken', response.token);
            this.router.navigate(['/admin-dashboard']);
          },
          (error) => {
            console.error('Login failed', error);
            alert('Invalid login credentials, please try again.');
          }
        );
    } else {
      alert('Please fill in both username and password');
    }
  }
}
