import { Injectable } from '@angular/core';
import { Recipe } from '../model/recipe';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CreateService {

  private apiUrl = "http://localhost:5029/api";
  constructor(private http: HttpClient) { }


  getCreated(userId: number): Observable<Recipe[]> {
    const headerValue = localStorage.getItem('headerValue');  // Get the token from localStorage

    if (headerValue) {
      const headers = new HttpHeaders({
        'Authorization': headerValue  // Add the token to the header
      });
    return this.http.get<Recipe[]>(`${this.apiUrl}/CreatedList/user/${userId}`, {headers});
  }
  else {
    return throwError('No authentication token found123');
  }

}
}

