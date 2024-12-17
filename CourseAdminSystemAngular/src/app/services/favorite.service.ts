import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Recipe } from '../model/recipe';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {


// Implement the getFavoriteRecipes method
  getFavoriteRecipes(userId: string): Observable<Recipe[]> {
    const headerValue = localStorage.getItem('headerValue');  // Get the token from localStorage
        
            if (headerValue) {
              const headers = new HttpHeaders({
                'Authorization': headerValue // Add the token to the header
              });
    return this.http.get<Recipe[]>(`${this.apiUrl}/favorites/${userId}`, {headers});
  }else {
    return throwError('No authentication token found123');
  }
  }

  private apiUrl = "http://localhost:5029/api";

  constructor(private http: HttpClient) { }

  // Fetch favorite recipes for a specific user
  getFavorites(userId: number): Observable<Recipe[]> {
    const headerValue = localStorage.getItem('headerValue');  // Get the token from localStorage
        
            if (headerValue) {
              const headers = new HttpHeaders({
                'Authorization': headerValue // Add the token to the header
              });
    return this.http.get<Recipe[]>(`${this.apiUrl}/FavoriteList/user/${userId}`, {headers});
  }else {
    return throwError('No authentication token found123');
  }
  }

  // Toggle a recipe as favorite or unfavorite for the user
  toggleFavorite(userId: number, recipeId: number): Observable<void> {
    const headerValue = localStorage.getItem('headerValue');  // Get the token from localStorage
        
            if (headerValue) {
              const headers = new HttpHeaders({
                'Authorization': headerValue // Add the token to the header
              });
    return this.http.post<void>(`${this.apiUrl}/FavoriteList/toggle/${userId}/${recipeId}`, null,{
      headers: headers,
      responseType: 'text' as 'json'
    });
    }else {
      return throwError('No authentication token found123');
    }
    }

    isFavorite(userId: number, recipeId: number): Observable<boolean> {
      const headerValue = localStorage.getItem('headerValue');  // Get the token from localStorage
          
              if (headerValue) {
                const headers = new HttpHeaders({
                  'Authorization': headerValue // Add the token to the header
                });
      return this.http.get<boolean>(`${this.apiUrl}/FavoriteList/isFavorite/${userId}/${recipeId}`, {headers});
    }else {
      return throwError('No authentication token found123');
    }
    }

    removeFavorite(userId: number, recipeId: number): Observable<void> {
      const headerValue = localStorage.getItem('headerValue');  // Get the token from localStorage
          
              if (headerValue) {
                const headers = new HttpHeaders({
                  'Authorization': headerValue // Add the token to the header
                });
      return this.http.delete<void>(`${this.apiUrl}/FavoriteList/removeFavorite/${userId}/${recipeId}`, {
      headers: headers,
      responseType: 'text' as 'json' });
    }else {
      return throwError('No authentication token found123');
    }
    }


}
