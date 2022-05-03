import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };
  formReset: any = {
    email: null
  };

  formNewPwd: any = {
    pin: null,
    newPassword: null
  };

  isLoggedIn = false;
  isLoginFailed = false;
  isNewPasswordDone = false;
  roles: string[] = [];
  errorReset:String ="";
  mode: number = 0;

  constructor(private authService: AuthService, 
    private tokenStorage: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
  }

  accedi(){
    //console.log("Accedi",this.form);
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe({
      next: (res) => {
        //console.log(data);
        this.tokenStorage.saveToken(res.accessToken);
        this.tokenStorage.saveUser(username);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        //this.reloadPage();
      },
      complete: () => { 
        this.router.navigate(['/dashboard']);
      },
      error: (e) => { 
        this.isLoginFailed = true;
        console.error(e);
      }
    }
    );
    
  }

  requestNewPwd(){
    this.mode=1; // request reset password
  }

  resetPwd(){
    //console.log(this.formReset.email);
    
    this.authService.requestResetPwd(this.formReset.email).subscribe({
      next: (res) => {
        console.log(res);
        this.errorReset = "";
        this.mode=2;
      },
      complete: () => { },
      error: (e) => { 
        console.error(e);
        this.errorReset = e.error.message;
      }
    });
  }

  newPwd(){
    const { pin, newPassword } = this.formNewPwd;
    const email = this.formReset.email;
    console.log(email);
    console.log(newPassword);

    this.authService.setNewPwd(email,pin,newPassword).subscribe({
      next: (res) => {
        console.log(res);
        this.mode=0;
        this.isNewPasswordDone=true;
      },
      complete: () => { },
      error: (e) => { 
        console.error(e);
        this.errorReset = e.error.message;
      }
    });

  }
  

}
