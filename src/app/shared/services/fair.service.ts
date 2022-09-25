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
export class FairService {

  constructor(private httpClient: HttpClient) { }

  getNews(fairId: number): Observable<any> {
    return this.httpClient.get(environment.apiUrl + `/Events/news?FairId=${fairId}`, httpOptions);
  }

  createEvent(
    description: string,
    location: string,
    startDate: Date,
    endDate: Date,
    details: string,
    fairId: number
  ): Observable<any>{
    return this.httpClient.post(
      environment.apiUrl + '/Events/event', 
      {
        description: description,
        location: location,
        startDate: startDate,
        endDate: endDate,
        details: details,
        fairId: fairId
      },
      httpOptions);
  }

  getCurentFairdId(): Observable<any>{
    return this.httpClient.get(environment.apiUrl + '/Fairs/current-fair', 
    httpOptions);
  }

  addFair(model: Date): Observable<any>{
    return this.httpClient.post(environment.apiUrl + `/Fairs/fair?model=${model}`,
    httpOptions);
  }

  getCurrentFairDays(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + '/Fairs/current-fair-days', 
    httpOptions);
  }

  deleteFair(id: number): Observable<any> {
    return this.httpClient.delete(environment.apiUrl + `/Fairs/fair?id=${id}`,
    httpOptions);
  }
  
}
