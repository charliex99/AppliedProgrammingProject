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
  getRecipe(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}/recipe/${id}`);
 }
  createRecipe(recipe: Recipe): Observable<any> {
    return this.http.post(`${this.baseUrl}/recipe`, recipe);
 }
  deleteRecipe(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/recipe/${id}`);
 }
}
