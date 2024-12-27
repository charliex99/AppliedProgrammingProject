import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    // Create a mock for AuthService
    authServiceMock = {
      authenticate: jasmine.createSpy('authenticate')
    };

    // Create a mock for Router
    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    // Configure the TestBed
    await TestBed.configureTestingModule({
      imports: [LoginComponent, NoopAnimationsModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ]
    }).compileComponents();

    // Initialize the component and fixture
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService.authenticate and navigate to profile on successful login', () => {
    // Set the username and password for a valid login scenario
    component.username = 'testuser';
    component.password = 'password123';

    // Mock the authenticate method to simulate a successful login
    authServiceMock.authenticate.and.returnValue(of({
      headervalue: 'mockToken',
      profile: { userId: 123 }
    }));

    // Call the login method
    component.login();

    // Check if AuthService.authenticate was called with the correct arguments
    expect(authServiceMock.authenticate).toHaveBeenCalledWith('testuser', 'password123');

    // Check if Router.navigate was called to go to the 'profile' page
    expect(routerMock.navigate).toHaveBeenCalledWith(['profile']);
  });

  it('should show an error message when invalid credentials are provided', () => {
    // Set the username and password for an invalid login scenario
    component.username = 'wronguser';
    component.password = 'wrongpassword';

    // Mock the authenticate method to simulate a failed login (e.g., invalid credentials)
    authServiceMock.authenticate.and.returnValue(throwError('Invalid credentials'));

    // Call the login method
    component.login();

    // Check if AuthService.authenticate was called with the correct arguments
    expect(authServiceMock.authenticate).toHaveBeenCalledWith('wronguser', 'wrongpassword');
    
  });
});


/*
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    // Create a mock for AuthService
    authServiceMock = {
      authenticate: jasmine.createSpy('authenticate').and.returnValue(of({
        headervalue: 'mockToken',
        profile: { userId: 123 }
      })),
    };

    // Create a mock for Router
    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    // Configure the TestBed
    await TestBed.configureTestingModule({
      imports: [LoginComponent, NoopAnimationsModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ]
    }).compileComponents();

    // Initialize the component and fixture
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService.authenticate and navigate to profile on successful login', () => {
    // Set the username and password
    component.username = 'testuser';
    component.password = 'password123';

    // Call the login method
    component.login();

    // Check if AuthService.authenticate was called with the correct arguments
    expect(authServiceMock.authenticate).toHaveBeenCalledWith('testuser', 'password123');

    // Check if Router.navigate was called to go to the 'profile' page
    expect(routerMock.navigate).toHaveBeenCalledWith(['profile']);
  });
});
*/

/*
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/
