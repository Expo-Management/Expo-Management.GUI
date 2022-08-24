import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const TOKEN_KEY = 'token';
const USER_EMAIL = 'email'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post(environment.apiUrl + '/Authenticate/login', { 
      username, password 
    }, httpOptions);
  }

  register(
    id: string, 
    name: string, 
    last: string, 
    username: string, 
    email: string, 
    // password: string, 
    birthday: string,
    institution: string = '',
    position: string = ''
    ): Observable<any> {
    return this.httpClient.post(environment.apiUrl + '/Auth/register', { 
      id, name, last, username, email,/* password,*/ birthday, institution, position}, httpOptions);
  }

  ForgetPassword(email: string): Observable<any>{
    return this.httpClient.post(environment.apiUrl + `/Authenticate/ForgetPassword?email=${email}`, httpOptions);
  }

  ResetPassword(token:string, email:string, newPassword:string, confirmPassword:string): Observable<any>{
    return this.httpClient.post(environment.apiUrl + '/Authenticate/ResetPassword',
    {
      token,
      email,
      newPassword,
      confirmPassword
    }, httpOptions);
  } 


  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
  
  public saveEmail(email: string): void {
    localStorage.removeItem(USER_EMAIL);
    localStorage.setItem(USER_EMAIL, email);
  }

  public getEmail(): string {
    return localStorage.getItem(USER_EMAIL)!;
  }

}
