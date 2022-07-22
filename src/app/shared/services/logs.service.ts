import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private httpClient: HttpClient) { }

  getLogs(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + '/api/Logs/logs', httpOptions);
  }

}
