import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post('/api/Authenticate/login', { 
      username, password 
    }, httpOptions);
  }

  register(id: string, name: string , last: string, username: string, email: string, password: string, birthday: string): Observable<any> {
    return this.httpClient.post('/api/Auth/register', { 
      id, name, last, username, email, password, birthday}, httpOptions);
  }

  ForgetPassword(email: string): Observable<any>{
    return this.httpClient.post(`/api/Authenticate/ForgetPassword?email=${email}`, httpOptions);
  }

  ResetPassword(token:string, email: string, newPassword:string, ConfirmPassword:string): Observable<any>{
    return this.httpClient.post('/api/Authenticate/ResetPassword', {
    token, email, newPassword, ConfirmPassword}, httpOptions);
  }
}
