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
  constructor(private userService: UserService) {}
  
  @Input() userId!: number;
  user!: User;
  router: any;

  ngOnInit(){
    this.userService.getUser(this.userId).subscribe(user => {
      this.user = user;
    });
  }
  editUser(id: number) {
    this.router.navigate(["edit-user", id]);
  }

  updateUser(){
    this.userService.updateUser(this.user!).subscribe();
  }


}
