import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { Recipe } from '../model/recipe';


@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit {
  recipes: Recipe[] = [];
  favoriteRecipeIds: Set<number> = new Set(); // Track favorite recipes by ID for quick access

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    const userId = 'user123';  // Retrieve actual user ID
    this.loadRecipes();
    this.loadFavorites(userId);
  }

  loadRecipes(): void {
    // Load all recipes - modify based on your data source
    // this.recipeService.getRecipes().subscribe((data) => this.recipes = data);
  }

  loadFavorites(userId: string): void {
    this.favoriteService.getFavorites(userId).subscribe(favRecipes => {
      this.favoriteRecipeIds = new Set(favRecipes.map(recipe => recipe.recipeId));
    });
  }

  toggleFavorite(userId: string, recipe: Recipe): void {
    if (this.favoriteRecipeIds.has(recipe.recipeId)) {
      this.favoriteService.removeFavorite(userId, recipe.recipeId).subscribe(() => {
        this.favoriteRecipeIds.delete(recipe.recipeId);
      });
    } else {
      this.favoriteService.addFavorite(userId, recipe.recipeId).subscribe(() => {
        this.favoriteRecipeIds.add(recipe.recipeId);
      });
    }
  }

  isFavorite(recipe: Recipe): boolean {
    return this.favoriteRecipeIds.has(recipe.recipeId);
  }
}
