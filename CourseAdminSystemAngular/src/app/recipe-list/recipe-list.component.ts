import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../model/recipe';
import { RecipeComponent } from '../recipe/recipe.component';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [RecipeComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {
  constructor(private recipeService: RecipeService){}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(listOfrecipes => {
      this.recipes = listOfrecipes;
    });
  }
  
  recipes: Recipe[] = []
}
  
  

 
  
    





