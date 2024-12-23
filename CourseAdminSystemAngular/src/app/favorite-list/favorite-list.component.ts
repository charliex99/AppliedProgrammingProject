import { Component, OnInit, } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { Recipe } from '../model/recipe';
import { NgModule } from '@angular/core';
import {MatSlideToggleChange, MatSlideToggleModule, _MatSlideToggleRequiredValidatorModule,} from '@angular/material/slide-toggle';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { RecipeComponent } from '../recipe/recipe.component';
import { RecipeService } from '../services/recipe.service';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { CreateService } from '../services/create.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-favorite-list',
  standalone: true,
  imports: [FavoriteListComponent, RecipeComponent, CommonModule, MatGridListModule, UserComponent],
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})


export class FavoriteListComponent implements OnInit {

  constructor(
    private favoriteService: FavoriteService, 
    private recipeService: RecipeService, 
    private router: Router,
    private userService: UserService
  ){}

  ngOnInit(): void {

    if (this.userService.authHeader == null) {
      this.router.navigate(["login"]);
      return;
    }

    const userId = Number(localStorage.getItem('userId'));

    if (userId){
      this. favoriteService.getFavorites(userId).subscribe({
        next: (listOfRecipes: Recipe[]) => {
          // Ensure listOfRecipes is an array before assigning it
          if (Array.isArray(listOfRecipes)) {
            console.log(this.recipes)
            this.recipes = listOfRecipes;
          } else {
            console.error('Expected an array, but received:', listOfRecipes);
            this.recipes = []; // Ensure recipes is always an array
          }
        },
        error: (err) => {
          console.error('Error fetching favorites:', err);
          this.recipes = []; // Fallback to an empty array on error
        }
      });
    }
  }
  recipes: Recipe[] = []


}



  

