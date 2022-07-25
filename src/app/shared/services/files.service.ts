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
export class FilesService {

  constructor(private httpClient: HttpClient) { }

  addFiles
  (Files: File){
    return this.httpClient.post(environment.apiUrl + '/Files/file', {
      Files: Files
    },
    httpOptions)
  }

  showFiles(): Observable<any>{
    return this.httpClient.get('/api/Files/files', httpOptions)
  }
  
  deleteFiles(name: string): Observable<any>{
    return this.httpClient.delete(`/api/Files/file?${name}`, httpOptions)
  }
}
