import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../model/recipe';
import { RecipeComponent } from '../recipe/recipe.component';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [RecipeComponent, CommonModule, MatGridListModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {
  constructor(private recipeService: RecipeService,
    private router: Router,
    private userService: UserService
  ){}

  ngOnInit(): void {

    if (this.userService.authHeader == null) {
      this.router.navigate(["login"]);
      return;
    }

    this.recipeService.getRecipes().subscribe(listOfrecipes => {
      this.recipes = listOfrecipes;
    });
  }
  
  recipes: Recipe[] = []
}
  
  

 
  
    





