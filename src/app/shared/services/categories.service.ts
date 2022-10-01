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
export class CategoriesService {

  constructor(private httpClient: HttpClient) { }

  addCategory(description: string): Observable<any>{
    return this.httpClient.post(environment.apiUrl + '/Category/category',
    {description: description}, httpOptions);
  }

  getAllCategories(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + '/Category/categories', 
    httpOptions);
  }

  deleteCategory(id: number): Observable<any> {
    return this.httpClient.delete(environment.apiUrl + `/Category/category?id=${id}`,
    httpOptions);
  }

}
