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

  createRecipe(recipe: { recipeName: string, recipeWord: string, recipeStory: string, recipeInstruct: string, recipeIngredients: string, userId: number }): Observable<any> {
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
