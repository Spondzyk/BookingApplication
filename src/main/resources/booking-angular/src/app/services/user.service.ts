import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./dto/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getLoggedUser(): Observable<User>{
    return this.http.get<User>('api/loggedUser');
  }

  getAccountDate(): Observable<User>{
    return this.http.get<User>('api/currentUser')
  }
  updateAccountData(data: User): Observable<User> {
    return this.http.put<User>('api/currentUser', data)
  }
  deleteAccount(): Observable<boolean>{
    return this.http.delete<boolean>('api/currentUser');
  }
  logout(): Observable<Object>{
    return this.http.get('perform_logout');
  }

}
