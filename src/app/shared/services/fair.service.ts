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
}
