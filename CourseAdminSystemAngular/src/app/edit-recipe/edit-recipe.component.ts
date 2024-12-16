import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../model/recipe';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css'
})

  export class EditRecipeComponent {
    

    
    @Input() recipeId!: number;
    recipe!: Recipe;
    createRecipeFormGroup: any;
    
  
    constructor(private recipeService: RecipeService, private router: Router) {}

    ngOnInit(){
      this.recipeService.getRecipe(this.recipeId).subscribe(recipe => {
        this.recipe = recipe;
      });
    }

    editRecipe(id: number) {
      this.router.navigate(["edit-recipe", id]); 
    }

    updateRecipe() {
        this.recipeService.updateRecipe(this.recipe!).subscribe(()=>{
          this.router.navigate(["recipes"]);
   });
    
  }
}



// Old Code as a Backup

/* 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css'
})



//Second Version (that worked): 


import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../model/recipe';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'; // 

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css'
})

  export class EditRecipeComponent {
    

    
    @Input() recipeId!: number;
    recipe!: Recipe;
    createRecipeFormGroup: any;
    
  
    constructor(private recipeService: RecipeService, private router: Router) {}

    ngOnInit(){
      this.recipeService.getRecipe(this.recipeId).subscribe(recipe => {
        this.recipe = recipe;
      });
    }

    editRecipe(id: number) {
      this.router.navigate(["edit-recipe", id]); 
    }

    updateRecipe() {
        this.recipeService.updateRecipe(this.recipe!).subscribe(()=>{
          this.router.navigate(["recipes"]);
   });
    
  }
}
 
*/
