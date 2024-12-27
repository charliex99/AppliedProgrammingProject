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
    const headerValue = localStorage.getItem('headerValue');  
    
        if (headerValue) {
          const headers = new HttpHeaders({
            'Authorization': headerValue  
          });
    return this.http.get<Recipe[]>(`${this.baseUrl}/recipe`, {headers});
  }
  else {
      return throwError('No authentication token found123');
    }
  }
  
  getRecipe(recipeId: number): Observable<Recipe> {
    const headerValue = localStorage.getItem('headerValue');  
    
        if (headerValue) {
          const headers = new HttpHeaders({
            'Authorization': headerValue 
          });
    return this.http.get<Recipe>(`${this.baseUrl}/recipe/${recipeId}`, {headers});
 }
 else {
  return throwError('No authentication token found123');
}
  }

 createAndUploadRecipe(recipe: { 
  recipeName: string, 
  recipeWord: string, 
  recipeStory: string, 
  recipeInstruct: string, 
  recipeIngredients: string, 
  userId: number 
  },
  file?: File): Observable <any> {
  return new Observable((observer) => {
  // Step 1: Create the recipe
  this.createRecipe(recipe).subscribe(
      (response: any) => {
          const recipeId = response.recipeId;  // Extract the recipeId from the response

          // Step 2: Upload the image after recipe creation
          if (file){
          this.uploadRecipeImage(recipeId, file).subscribe(
              (imageResponse) => {
                  observer.next({ recipeId, imageResponse});
                  observer.complete();
              },
              (imageError) => {
                  console.error("Error uploading image", imageError);
                  observer.error(imageError);
              }
          );
        }else {
          observer.next({ recipeId });
          observer.complete();
        }
      },
      (error) => {
          console.error("Error creating recipe", error);
          observer.error(error);
      }
  );
});
}

  createRecipe(recipe: { recipeName: string, recipeWord: string, recipeStory: string, recipeInstruct: string, recipeIngredients: string, userId: number }): Observable<any> {
    const headerValue = localStorage.getItem('headerValue');  
    
        if (headerValue) {
          const headers = new HttpHeaders({
            'Authorization': headerValue 
          });
    return this.http.post(`${this.baseUrl}/recipe`, recipe, {headers});
  }else {
    return throwError('No authentication token found123');
  }
    }

  uploadRecipeImage(recipeId: number, file:File): Observable <any> {
    const formData = new FormData();
    formData.append('file', file);

    const headerValue = localStorage.getItem('headerValue');  
    
    if (headerValue) {
      const headers = new HttpHeaders({
        'Authorization': headerValue 
      });
      return this.http.post(`${this.baseUrl}/recipe/uploadImage/${recipeId}`, formData, { headers });
    } else {
      return throwError('No authentication token found');
    }

  }

  deleteRecipe(recipeId: number): Observable<any> {
    const headerValue = localStorage.getItem('headerValue');  
    
        if (headerValue) {
          const headers = new HttpHeaders({
            'Authorization': headerValue 
          });
    return this.http.delete(`${this.baseUrl}/recipe/${recipeId}`, {headers});
 }else {
  return throwError('No authentication token found123');
}
  }


 updateRecipe(recipe: Recipe): Observable<any> {
  console.log('Updating recipe:', recipe); // delete later 
  const headerValue = localStorage.getItem('headerValue');  

  const { user, ...recipeWithoutUser } = recipe;
    
        if (headerValue) {
          const headers = new HttpHeaders({
            'Authorization': headerValue 
          });
  return this.http.put(`${this.baseUrl}/recipe`, recipeWithoutUser, {headers});
 }else {
  return throwError('No authentication token found123');
}}

  
}
