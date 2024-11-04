import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../model/recipe';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router'

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css'
})

  export class EditRecipeComponent {

    
    @Input() recipeId!: number;
    recipe!: Recipe;
    
  
    constructor(private recipeService: RecipeService, private router: Router) {}

    ngOnInit(){
      this.recipeService.getRecipe(this.recipeId).subscribe(recipe => {
        this.recipe = recipe;
      });
    }
    editRecipe(id: number) {
      this.router.navigate(["edit-user", id]);
    }

    updateRecipe() {
        this.recipeService.updateRecipe(this.recipe!).subscribe(()=>{
          this.router.navigate(["recipe"]);
        });
        
    }
  }


