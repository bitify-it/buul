import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paginator } from '../models/paginator.model';
import { environment } from 'src/environments/environment';
import { Negozio } from '../models/negozio.model';

const baseUrl = environment.apiUrl+'/negozio';

@Injectable({
  providedIn: 'root'
})
export class NegozioService {

  constructor(private http: HttpClient) { }

  getBaseUrl(){
    return baseUrl;
  }

  getAll(): Observable<Negozio[]> {
    return this.http.get<Negozio[]>(baseUrl+"/all");
  }
  getPaginated(page:number,size:number,sortOrder:number,sortField:string): Observable<Paginator> {
    return this.http.get<Paginator>(baseUrl+"?page="+page+"&size="+size+"&sortdir="+sortOrder+"&sortfield="+sortField);
  }

  get(id: any): Observable<Negozio> {
    return this.http.get<Negozio>(baseUrl+"/"+id);
  }

  create(data: Negozio ): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(data: Negozio ): Observable<any> {
    return this.http.put(baseUrl, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(baseUrl+"/"+id);
  }

  deleteAll(data: Negozio[]): Observable<any> {
    return this.http.put(baseUrl+"/deleteAll",data);
  }

   getReport(type:string): Observable<Blob> {
    return this.http.get(baseUrl+"/report/"+type, { responseType: 'blob' });
  }


}
