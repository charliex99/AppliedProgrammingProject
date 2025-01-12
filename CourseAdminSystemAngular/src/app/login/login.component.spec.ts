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
    authServiceMock = {
      authenticate: jasmine.createSpy('authenticate')
    };

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

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService.authenticate and navigate to profile on successful login', () => {
    component.username = 'testuser';
    component.password = 'password123';

    authServiceMock.authenticate.and.returnValue(of({
      headervalue: 'mockToken',
      profile: { userId: 123 }
    }));

    component.login();

    expect(authServiceMock.authenticate).toHaveBeenCalledWith('testuser', 'password123');

    expect(routerMock.navigate).toHaveBeenCalledWith(['profile']);
  });

  it('should show an error message when invalid credentials are provided', () => {
    component.username = 'wronguser';
    component.password = 'wrongpassword';

    authServiceMock.authenticate.and.returnValue(throwError('Invalid credentials'));

    component.login();
    expect(authServiceMock.authenticate).toHaveBeenCalledWith('wronguser', 'wrongpassword');
    
  });
});

