import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '../interfaces/user-profile';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const USER_ROLE = 'user-role'

@Injectable({
  providedIn: 'root'
})
export class PersonalInformationService {

  constructor(private httpClient: HttpClient) {}

  public getUSerInfo(user_id: string): Observable<UserProfile> {
    return this.httpClient.get<UserProfile>(`/api/Auth/user?userId=${user_id}`, httpOptions);
  }

  public updateProfile(
    id: string,
    name: string,
    last: string,
    email: string,
    username: string,
    password: string,
    birthDate: string
  ): Observable<any> {
    return this.httpClient.put<any>(
      '/api/Auth/profile/update', 
      {id, name, last, email, username, password, birthDate},
      httpOptions);
  }

  // public getFullName(): string {
  //   return localStorage.getItem(USER_FIRST) + ' ' + localStorage.getItem(USER_LAST)
  // }

  public saveRole(role: string): void {
    localStorage.removeItem(USER_ROLE);
    
    localStorage.setItem(USER_ROLE, role);
  }

  public getRole(): string | null {
    return localStorage.getItem(USER_ROLE);
  }

  // public getId(): string | null {
  //   return localStorage.getItem(USER_ID);
  // }
}
