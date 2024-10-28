import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';

@Component({
  selector: 'app-root', // how to instantiate the component (e.g.,<app-root></app-route>)
  standalone: true,
  imports: [RouterOutlet, RouterLink, UserComponent, UserListComponent], 
  //imports other components that this component depends on (e.g., UserComponent is being made available here)
  templateUrl: './app.component.html', //external html file 
  styleUrl: './app.component.css' //css file 
})

//actual class definition - contains logic of component 
export class AppComponent { 
  title = 'Recipe Book'; 
  //a porperty that is defined - can be used by the app.component.html file 
}

/*What is a component?
- Building block of an angular application 
- Responsible for: 
- Displaying a specific part of the user interface 
- Handle data and logic related to that part of the UI 
- Interact with services / other components
*/