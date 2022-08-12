import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserProfile } from '../interfaces/user-profile';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const USER_ROLE = 'user-role'
const USER_EMAIL = 'user-email'

@Injectable({
  providedIn: 'root'
})
export class PersonalInformationService {

  constructor(private httpClient: HttpClient) {}

  public getUSerInfo(user_id: string): Observable<UserProfile> {
    return this.httpClient.get<UserProfile>(environment.apiUrl + `/Auth/user?userId=${user_id}`, httpOptions);
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
      environment.apiUrl + '/Auth/profile/update', 
      {id, name, last, email, username, password, birthDate},
      httpOptions);
  }

  public getUserFullName(email: string): Observable<any>{
    return this.httpClient.get<any>(
      environment.apiUrl + `/Users/get-user-fullname?email=${email}`,
      httpOptions
    )
  }
  
  public saveRole(role: string): void {
    localStorage.removeItem(USER_ROLE);
    
    localStorage.setItem(USER_ROLE, role);
  }

  public saveEmail(email: string): void {
    localStorage.removeItem(USER_EMAIL);
    
    localStorage.setItem(USER_EMAIL, email);
  }

  public getRole(): string | null {
    return localStorage.getItem(USER_ROLE);
  }

  public getEmail(): string {
    return localStorage.getItem(USER_EMAIL)!;
  }
}
