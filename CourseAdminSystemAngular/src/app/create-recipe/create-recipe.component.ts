import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.css'
})
export class CreateRecipeComponent {

  constructor(private recipeService: RecipeService, private router: Router, private userService: UserService) {}

  ngOnInit(): void {

    if (this.userService.authHeader == null) {
      this.router.navigate(["login"]);
      return;
    }
  }
 
  recipeName: FormControl = new FormControl('', [Validators.required, Validators.minLength(3),]);
  recipeIngredients: FormControl = new FormControl('', [Validators.required, Validators.minLength(20),]); 
  recipeInstruct: FormControl = new FormControl('', [Validators.required, Validators.minLength(20),]);
// We decided that recipe instructions and the ingredient list should have a minimum length of 20 characters.
  
  

  createRecipeFormGroup: FormGroup = new FormGroup({
     
    recipeName: this.recipeName,
    recipeIngredients: this.recipeIngredients, 
    recipeInstruct: this.recipeInstruct  
  });


  CreateRecipe(){
    if (!this.createRecipeFormGroup.valid){
      console.log('Data not valid');
    return; 
  }
  
  const userId = Number(localStorage.getItem('userId'));

  this.recipeService.createRecipe({
    recipeName: this.recipeName.value,
    recipeIngredients: this.recipeIngredients.value, 
    recipeInstruct: this.recipeInstruct.value,
    userId: userId
    }, 
    
).subscribe({
    next: () => console.log('Done'),
    error: (err: string) => console.error('Something went wrong: ' + err)
    })

  this.redirect();
}

redirect(){
  window.location.reload();
  this.router.navigate(['/recipes']).then (() => { 
    window.location.reload();
  });
   
}}





