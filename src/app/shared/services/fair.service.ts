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
    title: string,
    location: string,
    startDate: Date,
    endDate: Date,
    details: string,
    allDay: boolean,
    kindEventId: number,
    fairId: number
  ): Observable<any>{
    return this.httpClient.post<any>(
      environment.apiUrl + '/Events/event', 
      {
        title: title,
        location: location,
        start: startDate,
        end: endDate,
        details: details,
        allDay: allDay,
        kindEvent: kindEventId,
        fairId: fairId
      },
      httpOptions);
  }

  updateEvent(
    id: number,
    title: string,
    location: string,
    startDate: Date,
    endDate: Date,
    details: string,
    allDay: boolean,
  ): Observable<any>{
    return this.httpClient.put<any>(
      environment.apiUrl + '/Events/event', 
      {
        id : id,
        title: title,
        location: location,
        start: startDate,
        end: endDate,
        details: details,
        allDay: allDay,
      },
      httpOptions);
  }

  getCurentFairdId(): Observable<any>{
    return this.httpClient.get(environment.apiUrl + '/Fairs/current-fair', 
    httpOptions);
  }

  addFair(): Observable<any>{
    return this.httpClient.post(environment.apiUrl + '/Fairs/fair',
    httpOptions);
  }

  getCurrentFairDays(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + '/Fairs/left-fair-days', 
    httpOptions);
  }

  deleteFair(id: number): Observable<any> {
    return this.httpClient.delete(environment.apiUrl + `/Fairs/fair?id=${id}`,
    httpOptions);
  }

  getEvents(): Observable<any> {
    return this.httpClient.get(
      environment.apiUrl + '/Events/events',
      httpOptions);
  }

  getKindEvents(): Observable<any> {
    return this.httpClient.get(
      environment.apiUrl + '/Events/kind-events',
      httpOptions);
  }

  getColours(): Observable<any> {
    return this.httpClient.get(
      environment.apiUrl + '/Events/colours',
      httpOptions);
  }

  createKindEvent(
    name: string,
    primary: string,
    secondary: Date,
  ): Observable<any>{
    return this.httpClient.post<any>(
      environment.apiUrl + '/Events/kind-event', 
      {
        name: name,
        primary: primary,
        secondary: secondary,
      },
      httpOptions);
  }

  updateKindEvent(
    id: number,
    name: string,
    primary: string,
    secondary: Date,
  ): Observable<any>{
    return this.httpClient.put<any>(
      environment.apiUrl + '/Events/kind-event', 
      {
        id: id,
        name: name,
        primary: primary,
        secondary: secondary,
      },
      httpOptions);
  }

  deleteKindEvent(KindEventId: number): Observable<any> {
    return this.httpClient.delete(environment.apiUrl + `/Events/kind-event?KindEventId=${KindEventId}`,
    httpOptions);
  }
}
