import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})

export class EditUserComponent {
  constructor(private userService: UserService, private router: Router) {}
  
  @Input() userId!: number;
  user!: User;
  

  ngOnInit(): void {
    this.userService.getUser(this.userId).subscribe(user => {
      this.user = user;
    });
  }
  
  updateUser(): void{

    const updatedUser = { ...this.user }; // Create a copy of the user object
  if (!updatedUser.password) {
    delete updatedUser.password; // Remove the password field if it is empty
  }

    this.userService.updateUser(this.user!).subscribe(
      (response) => {
        console.log('User updated successfully:', response);
        this.router.navigate(['profile']); 
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );

    
    
  }

  deleteUser(): void {
    this.userService.DeleteUser(this.user.userId).subscribe(
      (response) => {
        console.log('User has been sucessfully deleted:', response);
        localStorage.clear();
        this.router.navigate(['login']); 
      }
    );

    
  }
  /*
  editUser(id: number) {
    this.router.navigate(["edit-user", id]);
  }
*/

}
