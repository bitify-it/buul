import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-userprofile-panel',
  templateUrl: './userprofile-panel.component.html',
  styleUrls: ['./userprofile-panel.component.css']
})
export class UserprofilePanelComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };
  username:string;
  isLoggedIn: Observable<boolean>;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, 
              private tokenStorage: TokenStorageService,
              private router: Router) { }

  items: MenuItem[];

    ngOnInit() {
        this.items = [
            {label: 'Profilo', icon: 'pi pi-user'},
            {label: 'LogOut', 
              icon: 'pi pi-fw pi-sign-out', 
            command: (event) => {
              this.logout();
            }}
        ];
        this.isLoggedIn = this.tokenStorage.LoggedIn;
        if(this.isLoggedIn)
          this.username=this.tokenStorage.getUser();
    }

    accedi(){
      console.log("Accedi",this.form);
      const { username, password } = this.form;
      this.authService.login(username, password).subscribe(
        data => {
          console.log(data);
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(username);
          this.isLoginFailed = false;
          this.roles = this.tokenStorage.getUser().roles;
          this.ngOnInit();
          //this.reloadPage();
        },
        err => {
          this.errorMessage = err.error.message;
          console.log(this.errorMessage);
          this.isLoginFailed = true;
        }
      );
      
    }

    logout(): void {
      this.tokenStorage.signOut();
      window.location.href = "/";
    }

}
