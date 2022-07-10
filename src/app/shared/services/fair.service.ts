import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class FairService {

  constructor(private httpClient: HttpClient) { }

  getNews(fairId: number): Observable<any> {
    return this.httpClient.get(`/api/Events/news?FairId=${fairId}`, httpOptions);
  }

  getSecurityProtocols(fairId: number): Observable<any> {
    console.log('Here 1');
    return this.httpClient.get(`/api/Events/security-protocols?FairId=${fairId}`, httpOptions);
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
      '/api/Events/event', 
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
}
