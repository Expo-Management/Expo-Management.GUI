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
    return this.httpClient.get(environment.apiUrl + '/api/Projects/current-fair-projects', httpOptions);
  }

  getOlProjects(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + '/api/Projects/old-projects', httpOptions);
  }

  getMentions(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + '/api/Projects/mentions', httpOptions);
  }

  ShowProjects(): Observable<any>{
    return this.httpClient.get(environment.apiUrl + '/api/Projects/projects', httpOptions)
  }

  getProjectDetails(projectId: string | null): Observable<ProjectQualifications[]>{
    return this.httpClient.get<ProjectQualifications[]>(environment.apiUrl + `/api/Projects/project?projectId=${projectId}`, httpOptions)
  }
}
