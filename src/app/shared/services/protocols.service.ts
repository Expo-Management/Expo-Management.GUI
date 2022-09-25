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
export class ProtocolsService {

  constructor(private httpClient: HttpClient) { }

  getSecurityProtocols(fairId: number): Observable<any> {
    console.log('Here 1');
    return this.httpClient.get(environment.apiUrl + `/Events/security-protocols?FairId=${fairId}`, httpOptions);
  }

  addProtocols(description: string): Observable<any>{
    return this.httpClient.post(environment.apiUrl + `/Protocols/protocol?description=${description}`,
    httpOptions);
  }

  deleteProtocols(id: number): Observable<any> {
    return this.httpClient.delete(environment.apiUrl + `/Protocols/protocol?id=${id}`,
    httpOptions);
  }
}
