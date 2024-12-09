import { Component, inject, Input, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe';
import { RecipeService } from '../services/recipe.service';
import {Router} from '@angular/router'
import { AuthService } from '../services/auth.service';
import { FavoriteService } from '../services/favorite.service';
import { FavoriteListComponent } from '../favorite-list/favorite-list.component';
import {MatSlideToggleChange, MatSlideToggleModule, _MatSlideToggleRequiredValidatorModule,} from '@angular/material/slide-toggle';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [MatSlideToggleModule, FormsModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {

  @Input() recipe!: Recipe // Accepts a recipe from RecipeList

  isFavorite: boolean = false;
  recipeId!: number;

  constructor(
    private recipeService: RecipeService, 
    private favoriteService: FavoriteService, 
    private router: Router) {}

    ngOnInit(): void {
      this.recipeId = this.recipe.recipeId;
      //this.onFavoriteChange();
    }
  
    // Simple method to check if the recipe is a favorite
    /*
    checkIfFavorite(): void {
      const userId = Number(localStorage.getItem('userId'));
      if (userId) {
        this.favoriteService.isFavorite(userId, this.recipeId).subscribe(
          (response: boolean) => {
            this.isFavorite = response;
          }
        );
      }
    }
      */
  
    onFavoriteChange(event: MatSlideToggleChange): void {
      const userId = Number(localStorage.getItem('userId'));
      if (userId) {
        this.isFavorite = event.checked;
        this.favoriteService.toggleFavorite(userId, this.recipeId).subscribe();
      }
    }


    deleteRecipe(): void {
      this.recipeService.deleteRecipe(this.recipe.recipeId).subscribe(() => {
        alert('Recipe deleted successfully.');
        window.location.reload();
      });
    }
  
    editRecipe(recipeId: number): void {
      this.router.navigate(['edit-recipe', recipeId]);
  }
 

  






    /*

    ngOnInit(): void {
      // Set recipeId dynamically based on the input recipe
      this.recipeId = this.recipe.recipeId;
  
      // Check if the current recipe is already favorited by the user
      this.isFavorite = this.checkIfFavorite();
    }
  
    // Minimal method to check if the recipe is marked as a favorite
    checkIfFavorite(): boolean {
      const userId = Number(localStorage.getItem('userId'));
      // Implement a simple check or service call here if necessary
      return false; // Placeholder, replace with actual check
    }
  
    onFavoriteChange(event: MatSlideToggleChange): void {
      const userId = Number(localStorage.getItem('userId'));
  
      if (isNaN(userId) || userId === null) {
        console.error('User ID not found or invalid.');
        alert('User not logged in or user ID is invalid.');
        return;
      }
  
      this.isFavorite = event.checked; // Update the local state based on the toggle
  
      // Call the service to toggle the favorite status in the database
      this.favoriteService.toggleFavorite(userId, this.recipeId).subscribe(
        (response) => {
          console.log('Favorite status toggled successfully:', response);
        },
        (error) => {
          console.error('Error toggling favorite status:', error);
          alert('An error occurred while updating the favorite status. Please try again.');
          // Optionally revert the toggle if there's an error
          this.isFavorite = !this.isFavorite;
        }
      );
    }
  

    deleteRecipe(): void {
      this.recipeService.deleteRecipe(this.recipe.recipeId).subscribe(() => {
        alert('Recipe deleted successfully.');
        window.location.reload();
      });
    }
  
    editRecipe(recipeId: number): void {
      this.router.navigate(['edit-recipe', recipeId]);
    }
  }

    /*
    ngOnInit(): void {
      // Set recipeId dynamically based on the input recipe
      this.recipeId = this.recipe.recipeId;
      
    }

  onFavoriteChange(event: MatSlideToggleChange): void {
      const userId = Number(localStorage.getItem('userId'));

      if (isNaN(userId) || userId === null) {
        console.error('User ID not found or invalid.');
        alert('User not logged in or user ID is invalid.');
        return;
      }

      this.isFavorite = event.checked; // Update the local state based on the toggle

      // Call the service to toggle the favorite status in the database
      this.favoriteService.toggleFavorite(userId, this.recipeId).subscribe(
        (response) => {
          console.log('Favorite status toggled successfully:', response);
        },
        (error) => {
          console.error('Error toggling favorite status:', error);
          alert('An error occurred while updating the favorite status. Please try again.');
          // Optionally revert the toggle if there's an error
          this.isFavorite = !this.isFavorite;
        }
      );
  
  }


  

  deleteRecipe(): void {
    this.recipeService.deleteRecipe(this.recipe.recipeId).subscribe();
    window.location.reload();
  }

  editRecipe (recipeId: number){
      this.router.navigate(["edit-recipe", recipeId]);
  }
}
*/
}