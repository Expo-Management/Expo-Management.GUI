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
    return this.httpClient.get(environment.apiUrl + `/api/Events/news?FairId=${fairId}`, httpOptions);
  }

  getSecurityProtocols(fairId: number): Observable<any> {
    console.log('Here 1');
    return this.httpClient.get(environment.apiUrl + `/api/Events/security-protocols?FairId=${fairId}`, httpOptions);
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
      environment.apiUrl + '/api/Events/event', 
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
