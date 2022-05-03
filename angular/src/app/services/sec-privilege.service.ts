import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paginator } from '../models/paginator.model';
import { environment } from 'src/environments/environment';
import { SecPrivilege } from '../models/sec-privilege.model';

const baseUrl = environment.apiUrl+'/secprivilege';

@Injectable({
  providedIn: 'root'
})
export class SecPrivilegeService {

  constructor(private http: HttpClient) { }

  getBaseUrl(){
    return baseUrl;
  }

  getAll(): Observable<SecPrivilege[]> {
    return this.http.get<SecPrivilege[]>(baseUrl+"/all");
  }
  getPaginated(page:number,size:number,sortOrder:number,sortField:string): Observable<Paginator> {
    return this.http.get<Paginator>(baseUrl+"?page="+page+"&size="+size+"&sortdir="+sortOrder+"&sortfield="+sortField);
  }

  get(id: any): Observable<SecPrivilege> {
    return this.http.get<SecPrivilege>(baseUrl+"/"+id);
  }

  create(data: SecPrivilege ): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(data: SecPrivilege ): Observable<any> {
    return this.http.put(baseUrl, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(baseUrl+"/"+id);
  }

  deleteAll(data: SecPrivilege[]): Observable<any> {
    return this.http.put(baseUrl+"/deleteAll",data);
  }

   getReport(type:string): Observable<Blob> {
    return this.http.get(baseUrl+"/report/"+type, { responseType: 'blob' });
  }


}
