import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.apiUrl+'/security';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http: HttpClient) { }

  getBaseUrl(){
    return baseUrl;
  }

  hasPrivilege(p :String): Observable<any[]> {
    return this.http.get<any[]>(baseUrl+"/"+p);
  }

  getAllPrivileges(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl+"/authorities/all");
  }

  getPrivileges(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl+"/authorities");
  }
  

}
