import { Component, Input } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../services/user.service';


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

  constructor(private userService: UserService) {}

  DeleteUser(): void {
    this.userService.DeleteUser(this.user.userId).subscribe();
  }

}





