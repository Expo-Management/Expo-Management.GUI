import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpOptionsMultiPart = {
  headers: new HttpHeaders({
   "Content-Type": "multipart/form-data" 
  })
}; 


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private httpClient: HttpClient) { }

  getCurrentProjects(): Observable<any> {
    return this.httpClient.get('/api/Projects/current-fair-projects', httpOptions);
  }

  getOlProjects(): Observable<any> {
    return this.httpClient.get('/api/Projects/old-projects', httpOptions);
  }

  getMentions(): Observable<any> {
    return this.httpClient.get('/api/Projects/mentions', httpOptions);
  }

  ShowProjects(): Observable<any>{
    return this.httpClient.get('/api/Projects/projects', httpOptions)
  }

  CreateProject
  (
    name: string,
    description: string,
    Leader: string,
    Member2: string,
    Member3: string,
    Files: File,
    Fair: number
  ){
    return this.httpClient.post('/api/Projects/projects', 
    {
      name: name,
      description: description,
      Leader: Leader,
      Member2: Member2,
      Member3: Member3,
      Files: Files,
      Fair: Fair
    }, 
    httpOptionsMultiPart)
  }

  
}
