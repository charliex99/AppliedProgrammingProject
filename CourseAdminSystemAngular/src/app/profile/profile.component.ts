import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../model/user';
import { UserComponent } from '../user/user.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [UserComponent, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  //user: User | null = null;
  @Input() user!: User
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (this.userService.authHeader == null) {
      this.router.navigate(["login"]);
      return;
    }

    const userId = Number(localStorage.getItem('userId'));
    if (!isNaN(userId)) {
      console.log('Fetching user with ID:', userId);
      this.userService.getUser(userId).subscribe(
        (userData) => {
          console.log('User data received:', userData);
          this.user = userData;
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    } else {
      console.error('Invalid userId from localStorage:', userId);
      this.router.navigate(['login']);
    }
  }

  editUser(userId: number) {
    this.router.navigate(["edit-user", userId])
  }

  OverviewUsers(){
    this.router.navigate(['users'])
  }

}
/*
  ngOnInit(): void {
    if (this.userService.authHeader == null) {
      this.router.navigate(["login"]);
      return;
    }

   
    const userId = Number(localStorage.getItem('userId'));
    if (!isNaN(userId)) {
      this.userService.getUser(+userId).subscribe((userData) => {
        console.log('User data:', userData); 
        this.user = userData;
      });
    } else {
      this.router.navigate(["login"]);
    }
    /*this.userService.getUser(userId).subscribe((userData) => {
        this.user = userData;
    });
    */
    


