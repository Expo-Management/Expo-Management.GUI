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
export class JudgesService {
  constructor(private httpClient: HttpClient) {}

  addJudge(
    userId: string,
    username: string,
    name: string,
    last: string,
    email: string,
    phone: string,
    password: string
  ) {
    return this.httpClient.post(
      environment.apiUrl + '/api/Authenticate/register-judge', 
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

  getJudges(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + '/api/Users/judges', httpOptions);
  }

  getJudge(email: string): Observable<any> {
    return this.httpClient.get(environment.apiUrl + `/api/Users/judge?email=${email}`, httpOptions);
  }

  updateJudge(
    name: string,
    last: string,
    email: string,
    username: string,
    userId: string,
    phone: string
  ): Observable<any> {
    return this.httpClient.put(
      environment.apiUrl + '/api/Users/judge', 
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

  deleteJudge(email: string): Observable<any> {
    return this.httpClient.delete(environment.apiUrl + `/api/Users/judge?email=${email}`, httpOptions);
  }
}
