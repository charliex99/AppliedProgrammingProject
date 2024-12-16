/* 
import { Component, } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { Recipe } from '../model/recipe';
import { NgModule } from '@angular/core';
import {MatSlideToggleChange, MatSlideToggleModule, _MatSlideToggleRequiredValidatorModule,} from '@angular/material/slide-toggle';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-favorite-list',
  standalone: true,
  imports: [],
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})


export class FavoriteListComponent  {


}

*/

import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { Recipe } from '../model/recipe';
import { AuthService } from '../services/auth.service';  // To get the logged-in user's ID
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';  // Import CommonModule

@Component({
  selector: 'app-favorite-list',
  standalone: true,
  imports: [MatCardModule, CommonModule],  // Add CommonModule to imports
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit {
  favoriteRecipes: Recipe[] = [];  // Declare the array to hold favorite recipes

  constructor(
    private favoriteService: FavoriteService,  // Inject the favorite service
    private authService: AuthService  // Inject the auth service to get user details
  ) {}

  ngOnInit(): void {
    this.loadFavoriteRecipes();  // Load the recipes when the component initializes
  }

  loadFavoriteRecipes(): void {
    const userId = this.authService.getUserId();  // Get the logged-in user's ID from the AuthService
    if (userId) {
      this.favoriteService.getFavoriteRecipes(String(userId)).subscribe(  // Convert userId to string
        (recipes: Recipe[]) => {
          this.favoriteRecipes = recipes;  // Store the fetched recipes
        },
        (error: any) => {
          console.error('Error fetching favorite recipes:', error);  // Handle any errors
        }
      );
    } else {
      console.error('No user ID found');
    }
  }
}
  




//export class FavoriteListComponent implements OnInit {
  
  /*
  recipes: Recipe[] = [];
  favoriteRecipeIds: Set<number> = new Set(); // Track favorite recipes by ID for quick access

  constructor(private favoriteService: FavoriteService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  } */
/*
  ngOnInit(): void {
    const userId = Number(localStorage.getItem('userId'));
    this.loadRecipes();
    this.loadFavorites(userId);
  }

  loadRecipes(): void {
    // Load all recipes - modify based on your data source
    // this.recipeService.getRecipes().subscribe((data) => this.recipes = data);
  }

  loadFavorites(userId: number): void {
    this.favoriteService.getFavorites(userId).subscribe(favRecipes => {
      this.favoriteRecipeIds = new Set(favRecipes.map(recipe => recipe.recipeId));
    });
  }

  toggleFavorite(userId: number, recipe: Recipe): void {
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
    */

