import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminLoginComponent } from '../app/admin-login/admin-login.component';
import { MaintenanceRequestComponent } from '../app/maintenance-request/maintenance-request.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

// Test setup for AdminLoginComponent
describe('AdminLoginComponent', () => {
  let component: AdminLoginComponent;
  let fixture: ComponentFixture<AdminLoginComponent>;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLoginComponent ],
      imports: [ HttpClientTestingModule, FormsModule ],
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    })
    .compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log in and redirect to admin dashboard on successful login', () => {
    const mockResponse = { token: 'fake-token' };

    // Mock the API call
    const req = httpTestingController.expectOne('http://localhost:5000/api/auth/login');
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse);

    component.loginForm.setValue({ username: 'admin', password: 'password' });
    component.onLogin();

    expect(router.navigate).toHaveBeenCalledWith(['/admin-dashboard']);
  });

  it('should handle login error', () => {
    const mockError = new Error('Login failed');

    // Mock the API call to return an error
    const req = httpTestingController.expectOne('http://localhost:5000/api/auth/login');
    expect(req.request.method).toEqual('POST');
    req.flush(mockError, { status: 400, statusText: 'Bad Request' });

    fixture.detectChanges();

    // Check if an error message is displayed
    const errorMessage = fixture.debugElement.query(By.css('.error-message'));
    expect(errorMessage).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});

// Test setup for MaintenanceRequestComponent
describe('MaintenanceRequestComponent', () => {
  let component: MaintenanceRequestComponent;
  let fixture: ComponentFixture<MaintenanceRequestComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceRequestComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load and display maintenance requests', () => {
    const mockRequests = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        unitNumber: '101',
        serviceType: 'Plumbing',
        summary: 'Leaky faucet',
        details: 'The kitchen faucet is leaking.',
        status: 'open'
      },
      {
        id: '2',
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        unitNumber: '102',
        serviceType: 'Electrical',
        summary: 'Light not working',
        details: 'The living room light is not turning on.',
        status: 'open'
      }
    ];

    // Mock the API call
    const req = httpTestingController.expectOne('http://localhost:5000/api/maintenance-requests');
    expect(req.request.method).toEqual('GET');
    req.flush(mockRequests);

    fixture.detectChanges();

    // Check if data is displayed
    const tableRows = fixture.debugElement.queryAll(By.css('tr'));
    expect(tableRows.length).toBe(mockRequests.length + 1); // Including header row

    // Verify data for the first request
    const firstRow = tableRows[1].nativeElement;
    expect(firstRow.textContent).toContain('John Doe');
    expect(firstRow.textContent).toContain('101');
    expect(firstRow.textContent).toContain('Plumbing');
  });

  it('should call API to close request when button is clicked', () => {
    const mockRequests = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        unitNumber: '101',
        serviceType: 'Plumbing',
        summary: 'Leaky faucet',
        details: 'The kitchen faucet is leaking.',
        status: 'open'
      }
    ];

    // Mock the API call for getting requests
    const req = httpTestingController.expectOne('http://localhost:5000/api/maintenance-requests');
    expect(req.request.method).toEqual('GET');
    req.flush(mockRequests);

    fixture.detectChanges();

    // Simulate button click
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    // Mock the API call for closing a request
    const closeReq = httpTestingController.expectOne('http://localhost:5000/api/maintenance-requests/1/close');
    expect(closeReq.request.method).toEqual('POST');
    closeReq.flush(null); // Mock a successful response

    fixture.detectChanges();
  });

  it('should handle error while loading requests', () => {
    const mockError = new Error('Failed to load requests');

    // Mock the API call to return an error
    const req = httpTestingController.expectOne('http://localhost:5000/api/maintenance-requests');
    expect(req.request.method).toEqual('GET');
    req.flush(mockError, { status: 500, statusText: 'Server Error' });

    fixture.detectChanges();

    // Check if an error message is displayed
    const errorMessage = fixture.debugElement.query(By.css('.error-message'));
    expect(errorMessage).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
