import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categories } from '../interfaces/categories';
import { ProjectQualifications } from '../interfaces/project-qualifications';
import { Recommendation } from '../interfaces/recommendation';


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

  CreateProject(formData: FormData){
    return this.httpClient.post(environment.apiUrl + '/Projects/projects', formData)
  }

  getProjectDetails(projectId: string | null): Observable<ProjectQualifications[]>{
    return this.httpClient.get<ProjectQualifications[]>(environment.apiUrl + `/Projects/project?projectId=${projectId}`, httpOptions)
  }

  getProjectRecommendations(projectId: number): Observable<Recommendation[]>{
    return this.httpClient.get<Recommendation[]>(environment.apiUrl + `/Projects/recommendation-by-project?projectId=${projectId}`, httpOptions)
  }

  createProjectClaim(projectId: string | null, claimDescription: string): Observable<any>{
    return this.httpClient.post(
      environment.apiUrl + '/Projects/create-claim', 
      {projectId, claimDescription}, 
      httpOptions)
  }

  createProjectRecommendation(idProject: number, recommendation: string, correoJuez: string): Observable<any>{
    return this.httpClient.post(
      environment.apiUrl + '/Projects/recommendation', 
      {idProject, recommendation, correoJuez}, 
      httpOptions)
  }
  GetMembers(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + '/Projects/project-members', httpOptions);
  }

 getCurentFairdId(): Observable<any>{
  return this.httpClient.get(environment.apiUrl + '/Fairs/current-fair', 
  httpOptions);
 }

 getAllCategories(): Observable<any> {
  return this.httpClient.get(environment.apiUrl + '/Category/categories', 
  httpOptions);
 }

 getProjectFile(id: string | null) {
  return this.httpClient.get(environment.apiUrl + `/Files/download-project-file?id=${id}`, 
  {observe:'response', responseType:'blob' as 'json'});
 }

}
