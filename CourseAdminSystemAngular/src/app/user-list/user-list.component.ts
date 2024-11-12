import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserComponent } from '../user/user.component';
import { UserService } from '../services/user.service';
import { Router, RouterLink } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserComponent, RouterLink, MatGridListModule, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (this.userService.authHeader == null) {
      this.router.navigate(["login"]);
      return;
    }

    this.userService.getUsers().subscribe((listOfusers) => {
      this.users = listOfusers;
    });
  }
  
  users: User[] = [];

}
  /*
  users: User[] = [
    {
      userid: 1,
      name: 'Jessica Smith',
      email: 'jessica.smith@gmail.com'
    },
    {
      userid: 3,
      name: 'Andrew Taylor',
      email: 'andrew.taylor@gmail.com'
    }

  ]
  */


