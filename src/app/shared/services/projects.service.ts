import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categories } from '../interfaces/categories';
import { MembersEmails } from '../interfaces/members-emails';
import { ProjectQualifications } from '../interfaces/project-qualifications';
<<<<<<< HEAD
import { QualifyProject } from '../interfaces/qualify-project';
=======
import { Projects } from '../interfaces/projects';
>>>>>>> c0663c21fe95dedf18764a68cb4577fcd7fc37c6
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

 getMembersEmail(projectId: number): Observable<any>{
    return this.httpClient.get<any>(environment.apiUrl + `/Projects/members-emails?projectId=${projectId}`, httpOptions);
 }

  qualifyProject(
    punctuation: number,
    comments: string,
    project_id: number,
    judge_email: string
  ): Observable<any>{
    return this.httpClient.post(
      environment.apiUrl + '/Projects/qualify-project', 
      {
        punctuation: punctuation, 
        comments: comments,
        projectId: project_id,
        judgeEmail: judge_email
      },
      httpOptions)
  }
}
