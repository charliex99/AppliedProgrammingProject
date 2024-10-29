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

  GetUsers(): Observable<User[]> {
    return this.httpClient.get<User []>(this.baseUrl + "/User");
  }

  /*
  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/user/${id}`);
 }
  createUser(user: User): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/user`, user);
 }
    */

  DeleteUser(UserId: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/User/${UserId}`);
 }
}

