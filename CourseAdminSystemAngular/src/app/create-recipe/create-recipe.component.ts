import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';
import { Router } from '@angular/router';
import { User } from '../model/user';


@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.css'
})
export class CreateRecipeComponent {

  constructor(private recipeService: RecipeService, private router: Router) {}
  // id: FormControl = new FormControl('', [Validators.required]); 
  recipeName: FormControl = new FormControl('', [Validators.required]);
  recipeInstruct: FormControl = new FormControl('', [Validators.required]);
  //username: FormControl = new FormControl('', [Validators.required]); --> Username should be displayed 
  

  CreateRecipeFormGroup: FormGroup = new FormGroup({
     
    recipeName: this.recipeName,
     
    recipeInstruct: this.recipeInstruct,
     
  });

  //recipeService: any;
  //router: any;
     

  CreateRecipe(){
    if (!this.CreateRecipeFormGroup.valid){
      console.log('Data not valid');
    return; 
  }
  
  const userId = Number(localStorage.getItem('userId'));

  this.recipeService.createRecipe({
    recipeName: this.recipeName.value,
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
  this.router.navigate(['/recipes']).then (() => { //Check where to route 
    window.location.reload();
  });
   
}


}
