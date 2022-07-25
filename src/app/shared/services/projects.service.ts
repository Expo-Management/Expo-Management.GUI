import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectQualifications } from '../interfaces/project-qualifications';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private httpClient: HttpClient) { }

  getCurrentProjects(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + '/Projects/current-fair-projects', httpOptions);
  }

  getOlProjects(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + '/Projects/old-projects', httpOptions);
  }

  getMentions(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + '/Projects/mentions', httpOptions);
  }

  ShowProjects(): Observable<any>{
    return this.httpClient.get(environment.apiUrl + '/Projects/projects', httpOptions)
  }

  getProjectDetails(projectId: string | null): Observable<ProjectQualifications[]>{
    return this.httpClient.get<ProjectQualifications[]>(environment.apiUrl + `/Projects/project?projectId=${projectId}`, httpOptions)
  }

  createProjectClaim(projectId: string | null, claimDescription: string): Observable<any>{
    return this.httpClient.post(
      environment.apiUrl + '/Projects/create-claim', 
      {projectId, claimDescription}, 
      httpOptions)
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
    httpOptions)
  }

  
}
