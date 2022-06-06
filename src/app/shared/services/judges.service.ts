import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class JudgesService {
  constructor(private httpClient: HttpClient) {}

  getJudges(): Observable<any> {
    return this.httpClient.get('/api/Users/judges', httpOptions);
  }

  getJudge(email: string): Observable<any> {
    return this.httpClient.get(`/api/Users/judge?email=${email}`, httpOptions);
  }

  updateJudge(
    name: string,
    last: string,
    email: string,
    username: string,
    userId: string,
    phone: string
  ){
    return this.httpClient.put(
      '/api/Users/judge', 
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
}
