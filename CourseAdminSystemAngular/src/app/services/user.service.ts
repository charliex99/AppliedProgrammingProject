import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  baseUrl: string = "http://localhost:5029/api";
  constructor(private httpClient : HttpClient) { }

  
  getUsers(): Observable<User[]> {
    const headerValue = localStorage.getItem('headerValue');  
    
        if (headerValue) {
          const headers = new HttpHeaders({
            'Authorization': headerValue 
          });
    return this.httpClient.get<User[]>(this.baseUrl + "/User", {headers});
  }else {
      return throwError('No authentication token found123');
    }
  }
  
  addUser(user: { name: string; email: string; aboutSection: string; username: string; password: string }) : Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/user`, user);
  }


  getUser(userId: number): Observable<User> {
    const headerValue = localStorage.getItem('headerValue');  
    
        if (headerValue) {
          const headers = new HttpHeaders({
            'Authorization': headerValue 
          });
    return this.httpClient.get<User>(`${this.baseUrl}/user/${userId}`, {headers});
 }else {
  return throwError('No authentication token found123');
}
}

  updateUser(user: User): Observable<any> {
    const headerValue = localStorage.getItem('headerValue');  
    
        if (headerValue) {
          const headers = new HttpHeaders({
            'Authorization': headerValue 
          });
    return this.httpClient.put(`${this.baseUrl}/user`, user, {headers});
  }else {
    return throwError('No authentication token found123');
  }
}

  DeleteUser(userId: number): Observable<any> {
    const headerValue = localStorage.getItem('headerValue'); 
    
        if (headerValue) {
          const headers = new HttpHeaders({
            'Authorization': headerValue 
          });
    return this.httpClient.delete(`${this.baseUrl}/User/${userId}`, {headers});
 }else {
  return throwError('No authentication token found123');
}
}

get authHeader(): string { return localStorage["headerValue"]; }

}




