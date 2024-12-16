import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../model/recipe';



@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  baseUrl: string = "http://localhost:5029/api";

  constructor(private http:HttpClient) { }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.baseUrl}/recipe`);
  }
  getRecipe(recipeId: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}/recipe/${recipeId}`);
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

  createRecipe(recipe: { recipeName: string, recipeInstruct: string, recipeIngredients: string, userId: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}/recipe`, recipe);
  }

  deleteRecipe(recipeId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/recipe/${recipeId}`);
 }
 updateRecipe(recipe: Recipe): Observable<any> {
  return this.http.put(`${this.baseUrl}/recipe`, recipe);
 }

  /*createRecipe(recipe: Recipe): Observable<any> {
    return this.http.post(`${this.baseUrl}/recipe`, recipe);

 } */
}
