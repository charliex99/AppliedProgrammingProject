import { HttpClient, HttpHeaders } from '@angular/common/http';
 import { Injectable } from '@angular/core';
 import { Observable } from 'rxjs';
 import { Login } from '../model/login';
 @Injectable({
   providedIn: 'root'
 })

 
 export class AuthService {
   baseUrl: string = "http://localhost:5029/api";
   constructor(private http: HttpClient) {
   }
   authenticate(username: String, password: String): Observable<Login> {
    const credentials = btoa(`${username}:${password}`);
    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json'
    });
    
    console.log("Sending Authorization header:", `Basic ${credentials}`); 
    return this.http.post<Login>(`${this.baseUrl}/login`, 
       {Username: username,  
        Password: password},
       {headers: headers}
     );
} 

   isUserLoggedIn(): boolean {
    return localStorage.getItem('userId') !== null;
  }

  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? Number(userId) : null;
  }

}
