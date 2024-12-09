import { Component, Input } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'

})

export class UserComponent {
  //mode = 0;
  @Input() user!: User

  constructor(private userService: UserService, private router: Router) {}



}






