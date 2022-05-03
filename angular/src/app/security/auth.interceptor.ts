import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';


const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end
//const TOKEN_HEADER_KEY = 'x-access-token';   // for Node.js Express back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private token: TokenStorageService) { 
    
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const re = /actuator/;
    // Exclude interceptor for login request:
    if (req.url.search(re) === -1 ) {
      const token = this.token.getToken();
      if (token != null) {
        // for Spring Boot back-end
        req = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });

        // for Node.js Express back-end
        //authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
      }
    }
    return next.handle(req);
  }

 
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
