import { Component } from '@angular/core';
 import { FormsModule } from '@angular/forms';
 import { AuthService } from '../services/auth.service';
 import { Router } from '@angular/router';
 import { AddUserComponent } from '../add-user/add-user.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common'; 
import { MatButtonModule } from '@angular/material/button';

 @Component({
   selector: 'app-login',
   standalone: true,
   imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, CommonModule],
   templateUrl: './login.component.html',
   styleUrl: './login.component.css'
 })
 export class LoginComponent {
   username!: String;
   password!: String;
   authenticated = false;
   constructor(public auth: AuthService, private router: Router) {}

   login() {if (this.username!= null && this.password!= null) {
    this.auth.authenticate(this.username, this.password).subscribe((auth: any) => {
      //if (auth != null) {
      console.log('Authentication response:', auth);
      if (auth && auth.headervalue){
        // Save to the local storage
        localStorage.setItem('headerValue', auth.headervalue);
        if (auth.profile){
        localStorage.setItem('userProfile', JSON.stringify(auth.profile));
        localStorage.setItem('userId', auth.profile.userId.toString()); 
        } else {
          console.error('Profile is missing in the response');
        }
        this.authenticated = true;
        this.router.navigate(['profile'])
      }
}); }
} 
    createAccount(){
      this.router.navigate(['add-user']);
    }
      


}
   
   
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


  
 