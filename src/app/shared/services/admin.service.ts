import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
    institution: string= '',
    position: string = ''
  ) {
    return this.httpClient.post(
      environment.apiUrl + '/Authenticate/register-admin', 
      {
        userId: userId,
        username: username,
        name: name,
        lastname: last,
        email: email,
        phone: phone,
        institution: institution,
        position: position
      }, 
      httpOptions);
  }

  getAdmins(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + '/Users/admins', httpOptions);
  }

  getAdmin(email: string): Observable<any> {
    return this.httpClient.get(environment.apiUrl + `/Users/admin?email=${email}`, httpOptions);
  }

  updateAdmin(
    name: string,
    last: string,
    email: string,
    username: string,
    phone: string
  ): Observable<any> {
    return this.httpClient.put(
      environment.apiUrl + '/Users/admin', 
      {
        userName: username,
        name: name,
        lastname: last,
        email: email,
        phone: phone
      }, 
      httpOptions)
  }

  deleteAdmin(email: string): Observable<any> {
    return this.httpClient.delete(environment.apiUrl + `/Users/admin?email=${email}`, httpOptions);
  }
}
