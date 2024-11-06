import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})

export class AddUserComponent {
  constructor(private userService: UserService, private router: Router) {}
  
  // id: FormControl = new FormControl('', [Validators.required]); 
  name: FormControl = new FormControl('', [Validators.required]);
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);

  userFormGroup: FormGroup = new FormGroup({
     //userId: this.id, 
     name: this.name,
     email: this.email
  });

  addUser(){

    if(!this.userFormGroup.valid){
      console.log('Data not valid!');
      return;
    }

    this.userService.addUser({
      //userId: this.id.value,
      name: this.name.value,
      email: this.email.value
    }).subscribe({
      next: () => console.log('Done'),
      error: (err) => console.error('Something went wrong: ' + err)
      })

    this.redirect();
  }

  redirect(){
    window.location.reload();
    this.router.navigate(['/users']).then (() => {
      window.location.reload();
    });
    
  }
  

}
