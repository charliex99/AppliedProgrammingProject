import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  baseUrl: string = "http://localhost:5029/api";
  constructor(private httpClient : HttpClient) { }

  
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl + "/User");
  }
  

  getUser(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/user/${userId}`);
 }

  updateUser(user: User): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/user`, user);
  }

  DeleteUser(userId: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/User/${userId}`);
 }

   /*
  createUser(user: User): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/user`, user);
 }
    */
}

