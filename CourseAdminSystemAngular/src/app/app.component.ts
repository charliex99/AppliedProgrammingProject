import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import {MatTabsModule} from '@angular/material/tabs';
import { Router } from '@angular/router';
import {FavoriteListComponent} from './favorite-list/favorite-list.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';

@Component({
  selector: 'app-root', 
  standalone: true,
  imports: [RouterOutlet, RouterLink, UserComponent, UserListComponent, RecipeComponent, RecipeListComponent, MatTabsModule, FavoriteListComponent, EditRecipeComponent, CreateRecipeComponent], 
  templateUrl: './app.component.html', 
  styleUrl: './app.component.css', 
  encapsulation: ViewEncapsulation.None
})

export class AppComponent { 
  title = 'Recipe Book'; 

  links: string[] = ['Recipes', 'Favorites', 'Create Recipe', 'Profile']; 
  activeLink: string = this.links[0]; // Default active link

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
    this.activeLink = link; // Update active link
  }

  
}
