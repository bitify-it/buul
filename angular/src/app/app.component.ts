import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fioraio';
  value1: string ='';
  value2: string = '';

  isExpanding = false;
  isMobile = false;

  isLoggedIn$: Observable<boolean>;

  constructor(private tokenStorage: TokenStorageService,
    private router: Router) { }

  ngOnInit() {
    //console.log("isMobile: ",this.isMobile);
    this.isLoggedIn$ = this.tokenStorage.LoggedIn;
  }

  toggleSideBar() {
    this.isExpanding = !this.isExpanding;
  }
  toggleSideBarMobile() {
    this.isMobile = !this.isMobile;
    
  }

  closeSideBarMobile() {
    this.isMobile = false;
    
  }
}
