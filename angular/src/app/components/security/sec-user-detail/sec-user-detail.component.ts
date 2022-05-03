import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import {Location} from '@angular/common';
import { SecUser } from 'src/app/models/sec-user.model';
import { SecUserService } from 'src/app/services/sec-user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from 'src/app/utils/form.utils';
import { DataUtils } from 'src/app/utils/data.utils';
import { SecRoleService } from 'src/app/services/sec-role.service';
import { SecRole} from 'src/app/models/sec-role.model';



@Component({
  selector: 'app-sec-user-detail',
  templateUrl: './sec-user-detail.component.html',
  styleUrls: ['./sec-user-detail.component.css']
})
export class SecUserDetailComponent implements OnInit {

  id: number;
  secUser: SecUser;
  loading: boolean = true;
  edit: boolean = false;
  selectedSecUsers: SecUser[];
  submitted: boolean;
  private sub: any;
  secUserValidation: FormGroup;

  /* SecRole Relation */
  secRoles: SecRole[];
  selectedSecRoles: SecRole[];
  secRoleDialog: boolean;
  totalRecordsSecRole: number;


  constructor(private route: ActivatedRoute,
              private el: ElementRef,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private router: Router,
	            private _location: Location,
              private secUserService: SecUserService,
              private secRoleService: SecRoleService,

               ) { }

  ngOnInit(): void {
    this.secUser=new SecUser;
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; 
      //console.log(this.id);

      this.secUserService.get(this.id).subscribe({
        next: (res: SecUser) => {
          this.secUser = res;
	  /*Per le Date effettuare questa operazione per vedere il calendar
          this.secUser.dataSecUser = new Date(this.secUser.dataSecUser);
	  */

          this.loading = false;
          console.log(this.secUser);
        },
        complete: () => { },
        error: () => { }
      });

      
   });
  }

  enableEdit(){
    this.loading=true;
    this.edit=true;
    this.submitted = false;
    this.openIcon();

    /* SecRole Enable Preparation */
    if(!this.secRoles){
      this.secRoleService.getAll().subscribe({
        next: (res: SecRole[]) => {
          /*Rimuovo elementi già associati ad SecUser */
          this.totalRecordsSecRole = res.length;
          this.secRoles = DataUtils.removeSameCommonElements(res,this.secUser.secRoles);        },
        complete: () => {this.loading = false;},
        error: (e) => { console.log(e)}
      });
    }
    else{this.loading = false;}


  }

  disableEdit(){
    this.confirmationService.confirm({
      message: 'Sei sicuro di volere annullare? Tutte le modifiche effettuate andranno perse.',
      header: 'Conferma',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.edit=false;
        this.closeIcon();
        this.ngOnInit();
      }
    });
  }

  save(){
    this.submitted = true;
    this.startValidator();

    if(this.secUserValidation.status=="VALID"){
     if (this.secUser.id) {
      
      this.secUserService.update(this.secUser).subscribe({
        next: (res) => {
          //console.log(res);
          this.messageService.add({ severity: 'success', summary: 'Fatto', detail: 'SecUser aggiornato', life: 3000 });
        },
        complete: () => { 
          this.edit=false;
          this.submitted = false;
          let myTag = this.el.nativeElement.querySelector("i");
          this.closeIcon();
        },
        error: (e) => {
          console.log("Error: ",e);
          this.messageService.add({ severity: 'error', summary: 'Attenzione', detail: 'SecUser non modificato', life: 3000 });
        }
      });
    }
   }
  }

  startValidator(){
    this.secUserValidation = new FormGroup({
      id: new FormControl(this.secUser.id, Validators.compose([
      ])),

      username: new FormControl(this.secUser.username, Validators.compose([
        Validators.required,
      ])),

      email: new FormControl(this.secUser.email, Validators.compose([
        Validators.required,
      ])),

      password: new FormControl(this.secUser.password, Validators.compose([
      ])),

      pin: new FormControl(this.secUser.pin, Validators.compose([
      ])),


   });
   //console.log(this.secUserValidation);
   
  }

  getValidationMessage(secUserValidationField){
    return FormUtils.getValidationMessage(secUserValidationField);
  }

  deleteElement(secUser: SecUser, messageOn: boolean = true) {
    this.confirmationService.confirm({
      message: 'Sei sicuro di voler eliminare l \'elemento selezionato ?',
      header: 'Conferma',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.secUserService.delete(secUser.id).subscribe({
          next: (res) => {
            if(messageOn)
            this.messageService.add({ severity: 'success', summary: 'Fatto', detail: 'SecUser eliminato', life: 3000 });
            this.router.navigate(['/secUser']);
          },
          complete: () => { },
          error: (e) => {
            console.log(e);
            this.messageService.add({ severity: 'error', summary: 'Attenzione', detail: 'SecUser non eliminato', life: 3000 });
          }
        });
      }
    });
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  openIcon(){
    let myTag = this.el.nativeElement.querySelector("#status-icon");
    if(myTag.classList.contains('pi-lock')){
        myTag.classList.remove('pi-lock'); 
        myTag.classList.add('pi-lock-open'); 
    }
  }
  closeIcon(){
    let myTag = this.el.nativeElement.querySelector("#status-icon");
          if(myTag.classList.contains('pi-lock-open')){
              myTag.classList.remove('pi-lock-open'); 
              myTag.classList.add('pi-lock'); 
          }
  }

  back() {
    this._location.back();
  }

  /* SecRole Edit Utils */
  removeSecRole(secRole:SecRole){
    this.secRoles.push(secRole);
    var result = new Map(this.secUser.secRoles.map(i => [i.id, i]));
    result.delete(secRole.id);
    this.secUser.secRoles=Array.from( result.values() );
  }
  setSecRoles(){
    this.secRoleDialog = true;
  }
  addSecRolesToSecUser(){
    for(var i = 0; i < this.selectedSecRoles.length ; i++){
      this.secUser.secRoles.push(this.selectedSecRoles[i]);
      this.secRoles = DataUtils.removeSameCommonElements(this.secRoles,this.secUser.secRoles);
    }
    this.selectedSecRoles=[];
    this.secRoleDialog = false;
  }
  hideDialogSecRole() {
    this.secRoleDialog = false;
  }


}
