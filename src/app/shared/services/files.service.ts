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

  addFiles(formData: FormData){
    return this.httpClient.post(environment.apiUrl + '/Files/file', formData)
  }

  showFiles(): Observable<any>{
    return this.httpClient.get(environment.apiUrl + '/Files/files', httpOptions)
  }
  
  deleteFiles(id: string): Observable<any>{
    return this.httpClient.delete(environment.apiUrl + `/Files/file?${id}`, httpOptions)
  } 
  
  getFile(id: string | null) {
    return this.httpClient.get(environment.apiUrl + `/Files/download-file?id=${id}`, 
    {observe:'response', responseType:'blob' as 'json'});
   }
}
