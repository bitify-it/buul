import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    var loginRequest = {usernameOrEmail:username,password:password}
    return this.http.post(environment.authUrl + '/signin', loginRequest, httpOptions);
  }

  requestResetPwd(email: string): Observable<any> {
    var resetRequest = {email:email}
    return this.http.post(environment.authUrl + '/passwordRecovery/request', resetRequest, httpOptions);
  }

  setNewPwd(email: string, pin: number, password: string): Observable<any> {
    var resetRequest = {email:email, pin:pin, newPassword:password}
    return this.http.post(environment.authUrl + '/passwordRecovery/set', resetRequest, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(environment.authUrl + '/signup', {
      username,
      email,
      password
    }, httpOptions);
  }
}
