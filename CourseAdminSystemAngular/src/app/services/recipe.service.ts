import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Recipe } from '../model/recipe';



@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  baseUrl: string = "http://localhost:5029/api";

  constructor(private http:HttpClient) { }

  getRecipes(): Observable<Recipe[]> {
    const headerValue = localStorage.getItem('headerValue');  // Get the token from localStorage
    
        if (headerValue) {
          const headers = new HttpHeaders({
            'Authorization': headerValue  // Add the token to the header
          });
    return this.http.get<Recipe[]>(`${this.baseUrl}/recipe`, {headers});
  }
  else {
      return throwError('No authentication token found123');
    }
  }
  
  getRecipe(recipeId: number): Observable<Recipe> {
    const headerValue = localStorage.getItem('headerValue');  // Get the token from localStorage
    
        if (headerValue) {
          const headers = new HttpHeaders({
            'Authorization': headerValue // Add the token to the header
          });
    return this.http.get<Recipe>(`${this.baseUrl}/recipe/${recipeId}`, {headers});
 }
 else {
  return throwError('No authentication token found123');
}
  }
  /*createRecipe(recipe: {recipeName: string; recipeInstruct: string}, userId: number): Observable<any> {
    //const information = {... recipe, userId} //CHECK WHAT TO DO WITH USERNAME 
    const formData = new FormData();  // Create FormData instance
    formData.append('recipe_name', recipe.recipeName);  // Append recipe_name
    formData.append('recipe_instruct', recipe.recipeInstruct);  // Append recipe_instruct
    formData.append('userId', userId.toString());
    return this.http.post(`${this.baseUrl}/recipe`, formData)
 } */

 /*createRecipe(recipeName: string, recipeInstruct: string, userId: number): Observable<any> {

  const payload = {
    recipeName: recipeName,
    recipeInstruct: recipeInstruct,
    userId: userId
  };
    return this.http.post(`${this.baseUrl}/recipe`, payload)
 }
 */

 createAndUploadRecipe(recipe: { 
  recipeName: string, 
  recipeWord: string, 
  recipeStory: string, 
  recipeInstruct: string, 
  recipeIngredients: string, 
  userId: number 
  },
  file: File): Observable <any> {
  return new Observable((observer) => {
  // Step 1: Create the recipe
  this.createRecipe(recipe).subscribe(
      (response: any) => {
          const recipeId = response.recipeId;  // Extract the recipeId from the response

          // Step 2: Upload the image after recipe creation
          this.uploadRecipeImage(recipeId, file).subscribe(
              (imageResponse) => {
                  observer.next({ recipeId, imageResponse});
                  observer.complete();
                  //console.log("Image uploaded successfully", imageResponse);
              },
              (imageError) => {
                  console.error("Error uploading image", imageError);
                  observer.error(imageError);
              }
          );
      },
      (error) => {
          console.error("Error creating recipe", error);
          observer.error(error);
      }
  );
});
}

  createRecipe(recipe: { recipeName: string, recipeWord: string, recipeStory: string, recipeInstruct: string, recipeIngredients: string, userId: number }): Observable<any> {
  //createRecipe(formData: FormData): Observable<any> {
    const headerValue = localStorage.getItem('headerValue');  // Get the token from localStorage
    
        if (headerValue) {
          const headers = new HttpHeaders({
            'Authorization': headerValue // Add the token to the header
          });
    return this.http.post(`${this.baseUrl}/recipe`, recipe, {headers});
  }else {
    return throwError('No authentication token found123');
  }
    }

  uploadRecipeImage(recipeId: number, file:File): Observable <any> {
    const formData = new FormData();
    formData.append('file', file);

    const headerValue = localStorage.getItem('headerValue');  // Get the token from localStorage
    
    if (headerValue) {
      const headers = new HttpHeaders({
        'Authorization': headerValue // Add the token to the header
      });
      return this.http.post(`${this.baseUrl}/recipe/uploadImage/${recipeId}`, formData, { headers });
    } else {
      return throwError('No authentication token found');
    }

  }

  deleteRecipe(recipeId: number): Observable<any> {
    const headerValue = localStorage.getItem('headerValue');  // Get the token from localStorage
    
        if (headerValue) {
          const headers = new HttpHeaders({
            'Authorization': headerValue // Add the token to the header
          });
    return this.http.delete(`${this.baseUrl}/recipe/${recipeId}`, {headers});
 }else {
  return throwError('No authentication token found123');
}
  }


 updateRecipe(recipe: Recipe): Observable<any> {
  const headerValue = localStorage.getItem('headerValue');  // Get the token from localStorage
    
        if (headerValue) {
          const headers = new HttpHeaders({
            'Authorization': headerValue // Add the token to the header
          });
  return this.http.put(`${this.baseUrl}/recipe`, recipe, {headers});
 }else {
  return throwError('No authentication token found123');
}}

  /*createRecipe(recipe: Recipe): Observable<any> {
    return this.http.post(`${this.baseUrl}/recipe`, recipe);

 } */
}
