import { Component, Input } from '@angular/core';
import { Recipe } from '../model/recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {
  //mode = 0;
  @Input() recipe!: Recipe // Accepts a recipe from RecipeList

  constructor(private recipeService: RecipeService) {}

  DeleteRecipe(): void {
    this.recipeService.deleteRecipe(this.recipe.recipeId).subscribe();
  }

}








