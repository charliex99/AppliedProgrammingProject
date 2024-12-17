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
       //USERNAME: username,
       //PASSWORD: password
       {Username: username,  // Ensure the field name is "Username"
        Password: password},
       {headers: headers}
     );
} 

//take this out?
/*storeToken(headerValue: string): void {
  localStorage.setItem('authToken', headerValue);  // Store the token in localStorage
  console.log("Stored token in localStorage:", headerValue);
}*/

   // Method to check if the user is logged in
   isUserLoggedIn(): boolean {
    return localStorage.getItem('userId') !== null;
  }

  // Method to get the userId from localStorage
  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? Number(userId) : null;
  }

}
