import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) {}

  addProfesor(
    userId: string,
    username: string,
    name: string,
    last: string,
    email: string,
    phone: string,
    password: string
  ) {
    return this.httpClient.post(
      '/api/Authenticate/register-admin', 
      {
        id: userId,
        username: username,
        name: name,
        lastname: last,
        email: email,
        phone: phone,
        password: password
      }, 
      httpOptions);
  }

  getAdmins(): Observable<any> {
    return this.httpClient.get('/api/Users/admins', httpOptions);
  }

  getAdmin(email: string): Observable<any> {
    return this.httpClient.get(`/api/Users/admin?email=${email}`, httpOptions);
  }

  updateAdmin(
    name: string,
    last: string,
    email: string,
    username: string,
    userId: string,
    phone: string
  ): Observable<any> {
    return this.httpClient.put(
      '/api/Users/admin', 
      {
        id: userId,
        userName: username,
        name: name,
        lastname: last,
        email: email,
        phone: phone
      }, 
      httpOptions)
  }

  deleteAdmin(email: string): Observable<any> {
    return this.httpClient.delete(`/api/Users/admin?email=${email}`, httpOptions);
  }
}
