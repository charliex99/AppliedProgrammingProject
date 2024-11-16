import { Component } from '@angular/core';
 import { FormsModule } from '@angular/forms';
 import { AuthService } from '../services/auth.service';
 import { Router } from '@angular/router';

 @Component({
   selector: 'app-login',
   standalone: true,
   imports: [FormsModule],
   templateUrl: './login.component.html',
   styleUrl: './login.component.css'
 })
 export class LoginComponent {
   username!: String;
   password!: String;
   authenticated = false;
   constructor(public auth: AuthService, private router: Router) {}
   login() {if (this.username!= null && this.password!= null) {
    this.auth.authenticate(this.username, this.password).subscribe((auth) => {
      if (auth != null) {
        // Save to the local storage
        localStorage.setItem('headerValue', auth.headerValue);
        this.authenticated = true;
        this.router.navigate(['users'])
      }
}); }
} }
   
   
   /*
   {if (this.username && this.password) {
    this.auth.authenticate(this.username, this.password).subscribe({
      next: (auth) => {
        if (auth && auth.headerValue) {
          // Save the token to local storage
          localStorage.setItem('authToken', auth.headerValue);
          this.authenticated = true;
          this.router.navigate(['users']);
        } else {
          console.error("Authentication failed: No headerValue received.");
        }
      },
      error: (err) => {
        console.error("Login failed:", err);
        alert("Login failed. Please check your credentials and try again.");
      }
    });
  } else {
    alert("Please enter both username and password.");
  }
}
}
*/


  
 