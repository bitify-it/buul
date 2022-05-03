import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.serverUrl+'/actuator';

@Injectable({
  providedIn: 'root'
})
export class ActuatorService {

  constructor(private http: HttpClient) { }

  getBaseUrl(){
    return baseUrl;
  }

  health(): Observable<any> {
    return this.http.get<any>(baseUrl+"/health");
  }

  info(): Observable<any> {
    return this.http.get<any>(baseUrl+"/info");
  }

  env(): Observable<any> {
    return this.http.get<any>(baseUrl+"/env");
  }

  metrics(): Observable<any> {
    return this.http.get<any>(baseUrl+"/metrics");
  }

  getByName(prop:string): Observable<any> {
    return this.http.get<any>(baseUrl+"/"+prop);
  }
  
}
