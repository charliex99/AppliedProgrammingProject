import { Component, inject, Input, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe';
import { RecipeService } from '../services/recipe.service';
import {Router} from '@angular/router'
import { AuthService } from '../services/auth.service';
import { FavoriteService } from '../services/favorite.service';
import { FavoriteListComponent } from '../favorite-list/favorite-list.component';
import {MatSlideToggleChange, MatSlideToggleModule, _MatSlideToggleRequiredValidatorModule,} from '@angular/material/slide-toggle';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, FormsModule, MatCardModule, MatButtonModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {

  @Input() recipe!: Recipe // Accepts a recipe from RecipeList

  isFavorite: boolean = false;
  recipeId!: number;
  user: any;
  userId!: number;
  canEditOrDelete: boolean = false;

  constructor(
    private recipeService: RecipeService, 
    private userService: UserService,
    private favoriteService: FavoriteService, 
    private router: Router) {}

    ngOnInit(): void {
      console.log(this.recipe.user);
      const userId = Number(localStorage.getItem('userId'));
      this.recipeId = this.recipe.recipeId;
      this.userId = userId;
      //this.onFavoriteChange();

      console.log('Logged-in User ID:', userId);
      console.log('recipe user:', this.recipe.user);
      console.log('Recipe Author ID:', this.recipe.user.userId);

      this.canEditOrDelete = this.recipe.user.userId === userId;
      console.log('Can Edit or Delete:', this.canEditOrDelete);

      if (userId) {
        this.favoriteService.isFavorite(userId, this.recipeId).subscribe(
          (isFavorite: boolean) => {
            this.isFavorite = isFavorite; // Set the toggle state based on the response
          },
          (error) => {
            console.error('Error fetching favorite state:', error);
          }
        );
      }
    }
  
    onFavoriteChange(event: MatSlideToggleChange): void {
      const userId = Number(localStorage.getItem('userId'));
      this.recipeId = this.recipe.recipeId;

      if (userId) {
        this.isFavorite = event.checked;

        if (this.isFavorite){
          this.favoriteService.toggleFavorite(userId, this.recipeId).subscribe();
        }
        else{
          this.favoriteService.removeFavorite(userId, this.recipeId).subscribe();
        }
        
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
 

}