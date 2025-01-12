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
   username!: string;
   password!: string;
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
        this.router.navigate(['recipes'])
      }
}); }
} 
    createAccount(){
      this.router.navigate(['add-user']);
    }
      


}
   
   

  
 