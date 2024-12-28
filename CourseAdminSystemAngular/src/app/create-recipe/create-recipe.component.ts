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

  selectedFile: File | null = null;

  constructor(private recipeService: RecipeService, private router: Router, private userService: UserService) {}

  ngOnInit(): void {

    if (this.userService.authHeader == null) {
      this.router.navigate(["login"]);
      return;
    }
  }
 
  // We decided that recipe instructions and the ingredient list should have a minimum length of 20 characters.
  recipeName: FormControl = new FormControl('', [Validators.required, Validators.minLength(3),]);
  recipeWord: FormControl = new FormControl('', [Validators.required, Validators.minLength(3),]);
  recipeStory: FormControl = new FormControl('', [Validators.required, Validators.minLength(20),]);
  recipeIngredients: FormControl = new FormControl('', [Validators.required, Validators.minLength(20),]); 
  recipeInstruct: FormControl = new FormControl('', [Validators.required, Validators.minLength(20),]);

  createRecipeFormGroup: FormGroup = new FormGroup({
    recipeName: this.recipeName,
    recipeWord: this.recipeWord,
    recipeStory: this.recipeStory,
    recipeIngredients: this.recipeIngredients, 
    recipeInstruct: this.recipeInstruct,  
  });

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0]; // Save the selected file
  }

  CreateRecipe(){
    if (!this.createRecipeFormGroup.valid){
      console.log('Data not valid');
    return; 
  }
  
  const userId = Number(localStorage.getItem('userId'));
  console.log('data found');
 
  const recipeData = {
    recipeName: this.recipeName.value,
    recipeWord: this.recipeWord.value,
    recipeStory: this.recipeStory.value,
    recipeIngredients: this.recipeIngredients.value,
    recipeInstruct: this.recipeInstruct.value,
    userId: userId
  };

  if (this.selectedFile) {
    this.recipeService.createAndUploadRecipe(recipeData, this.selectedFile).subscribe({
      next: () => {console.log('recipe created and image uploaded successfully');
      this.redirect();}, 
      error: (err: string) => console.error('Something went wrong' + err)
    });
  } else {
    console.error('Please select an image file to upload.');
  }

    
}

redirect(){
  window.location.reload();
  this.router.navigate(['/recipes']).then (() => { 
    window.location.reload();
  });

}
   
}


