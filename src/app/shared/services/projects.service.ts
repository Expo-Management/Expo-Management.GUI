import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectQualifications } from '../interfaces/project-qualifications';
import { Recommendation } from '../interfaces/recommendation';
import { JudgeCalification } from '../interfaces/judge-calification';


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

  RemoveStudentFromProject(email: string | null): Observable<any>{
    return this.httpClient.put(environment.apiUrl + `/Projects/remove-user-project?email=${email}`, httpOptions)
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
      {
       idProject: idProject,
       recommendation: recommendation,
       correoJuez: correoJuez
      }, 
      httpOptions)
  }

  GetMembers(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + '/Projects/project-members', httpOptions);
  }

 getProjectFile(id: string | null) {
    return this.httpClient.get(environment.apiUrl + `/Files/download-project-file?id=${id}`, 
    {observe:'response', responseType:'blob' as 'json'});
 }

 getMembersEmail(projectId: number): Observable<any>{
    return this.httpClient.get<any>(environment.apiUrl + `/Projects/members-emails?projectId=${projectId}`, httpOptions);
 }

 qualify(punctuation: number, projectId: number, judgeEmail: string): Observable<any>{
  console.log('testService')
  return this.httpClient.post(
    environment.apiUrl + '/Projects/qualify-project',
    {
      punctuation: punctuation,
      projectId: projectId,
      judgeEmail: judgeEmail,
    },
    httpOptions
  )
 }

  getProjectQualifications(projectId: number): Observable<JudgeCalification[]>{
    return this.httpClient.get<JudgeCalification[]>(environment.apiUrl + `/Projects/project-qualifications?projectId=${projectId}`, httpOptions)
  }

  getProjectsByYear(): Observable<any>{
    return this.httpClient.get<any>(environment.apiUrl + `/Projects/project-by-year`, httpOptions)
  }

  getProjectsByCategory(): Observable<any>{
    return this.httpClient.get<any>(environment.apiUrl + `/Projects/project-by-category`, httpOptions)
  }

  getProjectsByQualifications(): Observable<any>{
    return this.httpClient.get<any>(environment.apiUrl + `/Projects/project-by-qualifications`, httpOptions)
  }

  getUsersByProject(): Observable<any>{
    return this.httpClient.get<any>(environment.apiUrl + `/Projects/users-per-project`, httpOptions)
  }

  canJudgeQualifyTheProject(project_id: number, judge_email: string): Observable<any>{
    return this.httpClient.get<any>(environment.apiUrl + `/Projects/can-judge-qualify-project?ProjectId=${project_id}&JudgeEmail=${judge_email}`, httpOptions);
  }
}
