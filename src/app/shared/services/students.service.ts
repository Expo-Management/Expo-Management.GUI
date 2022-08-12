import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private httpClient: HttpClient) { }

  addStudent(
    userId: string,
    username: string,
    name: string,
    last: string,
    email: string,
    phone: string,
    password: string,
    institution: string = '',
    position: string = ''
  ) {
    return this.httpClient.post(
      environment.apiUrl + '/Authenticate/register', 
      {
        id: userId,
        username: username,
        name: name,
        lastname: last,
        email: email,
        phone: phone,
        password: password,
        institution: institution,
        position: position
      }, 
      httpOptions);
  }

  getStudents(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + '/Users/students', httpOptions);
  }

  getStudent(email: string): Observable<any> {
    return this.httpClient.get(environment.apiUrl + `/Users/student?email=${email}`, httpOptions);
  }

  updateStudent(
    name: string,
    last: string,
    email: string,
    username: string,
    phone: string
  ): Observable<any> {
    return this.httpClient.put(
      environment.apiUrl + '/Users/student', 
      {
        userName: username,
        name: name,
        lastname: last,
        email: email,
        phone: phone
      }, 
      httpOptions)
  }

  deleteStudent(email: string): Observable<any> {
    return this.httpClient.delete(environment.apiUrl + `/Users/student?email=${email}`, httpOptions);
  }

}
