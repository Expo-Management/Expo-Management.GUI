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
    formData: FormData
  ){
    return this.httpClient.post('/api/Projects/projects', formData)
  }

  
}
