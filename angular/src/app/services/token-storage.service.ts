import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const loginPage = environment.loginPage;

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  get LoggedIn() {
    this.isLoggedIn();
    return this.loggedIn.asObservable();
  }

  isLoggedIn() {
    if(!loginPage){
      //If loginPage is disabled
      this.loggedIn.next(true);
    }
    else if(this.getToken()!=null){
      this.loggedIn.next(true);
    }
    else{
      this.loggedIn.next(false);
    }
  }

  signOut(): void {
    console.log("logout");
    
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    this.isLoggedIn();
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}
