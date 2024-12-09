import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../model/recipe';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private apiUrl = "http://localhost:5029/api";

  constructor(private http: HttpClient) { }

  // Fetch favorite recipes for a specific user
  //getFavorites(userId: number): Observable<Recipe[]> {
    //return this.http.get<Recipe[]>(`${this.apiUrl}/user/${userId}`);
  //}

  // Toggle a recipe as favorite or unfavorite for the user
  toggleFavorite(userId: number, recipeId: number): Observable<void> {
    //return this.http.post<any>(`${this.apiUrl}/toggle`, { userId, recipeId });
    return this.http.post<void>(`${this.apiUrl}/FavoriteList/toggle/${userId}/${recipeId}`, null, {
      responseType: 'text' as 'json'
    });
    }
  }



