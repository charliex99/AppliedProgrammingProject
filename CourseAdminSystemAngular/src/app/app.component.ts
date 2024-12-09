import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import {MatTabsModule} from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root', // how to instantiate the component (e.g.,<app-root></app-route>)
  standalone: true,
  imports: [RouterOutlet, RouterLink, UserComponent, UserListComponent, RecipeComponent, RecipeListComponent, MatTabsModule], 
  //imports other components that this component depends on (e.g., UserComponent is being made available here)
  templateUrl: './app.component.html', //external html file 
  styleUrl: './app.component.css', //css file 
  encapsulation: ViewEncapsulation.None
})

//actual class definition - contains logic of component 
export class AppComponent { 
  title = 'Recipe Book'; 

  links: string[] = ['Recipes', 'Favorites', 'Create Recipe', 'Profile']; // Define your tab links
  activeLink: string = this.links[0]; // Default active link

  
  //a porperty that is defined - can be used by the app.component.html file 
  constructor(private router: Router) {}
  
  goTo(link: string) {
    switch (link) {
      case 'Recipes':
        this.router.navigate(['/recipes']);
        break;
      case 'Favorites':
        this.router.navigate(['/favorites']);
        break;
      case 'Create Recipe':
        this.router.navigate(['/create-recipe']);
        break;
      case 'Profile':
        this.router.navigate(['/profile']);
        break;
      default:
        break;
    }
    this.activeLink = link; // Update the active link
  }

  
}

/*What is a component?
- Building block of an angular application 
- Responsible for: 
- Displaying a specific part of the user interface 
- Handle data and logic related to that part of the UI 
- Interact with services / other components
*/
