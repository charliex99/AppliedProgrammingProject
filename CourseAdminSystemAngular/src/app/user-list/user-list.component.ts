import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserComponent } from '../user/user.component';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{
  constructor(private userService: UserService) {}

  ngOnInit(): void {
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


