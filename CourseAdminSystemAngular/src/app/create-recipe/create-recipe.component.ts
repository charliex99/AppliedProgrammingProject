import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.css'
})
export class CreateRecipeComponent {
  // id: FormControl = new FormControl('', [Validators.required]); 
  recipeName: FormControl = new FormControl('', [Validators.required]);
  recipeInstruct: FormControl = new FormControl('', [Validators.required]);
  //username: FormControl = new FormControl('', [Validators.required]); --> Username should be displayed 
  

  CreateRecipeFormGroup: FormGroup = new FormGroup({
     
    recipeName: this.recipeName,
     
    recipeInstruct: this.recipeInstruct,
     
  });
  recipeService: any;
  router: any;
     

  CreateRecipe(){
    if (!this.CreateRecipeFormGroup.valid){
      console.log('Data not valid');
    return; 
  }

  this.recipeService.createRecipe({
   
    recipeName: this.recipeName.value,
    recipeInstruct: this.recipeInstruct.value,
   
  }).subscribe({
    next: () => console.log('Done'),
    error: (err: string) => console.error('Something went wrong: ' + err)
    })

  this.redirect();
}

redirect(){
  window.location.reload();
  this.router.navigate(['/create-recipe']).then (() => { //Check where to route 
    window.location.reload();
  });
    
}


}
