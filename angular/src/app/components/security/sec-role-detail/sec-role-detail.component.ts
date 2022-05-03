import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import {Location} from '@angular/common';
import { SecRole } from 'src/app/models/sec-role.model';
import { SecRoleService } from 'src/app/services/sec-role.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from 'src/app/utils/form.utils';
import { DataUtils } from 'src/app/utils/data.utils';
import { SecPrivilegeService } from 'src/app/services/sec-privilege.service';
import { SecPrivilege} from 'src/app/models/sec-privilege.model';



@Component({
  selector: 'app-sec-role-detail',
  templateUrl: './sec-role-detail.component.html',
  styleUrls: ['./sec-role-detail.component.css']
})
export class SecRoleDetailComponent implements OnInit {

  id: number;
  secRole: SecRole;
  loading: boolean = true;
  edit: boolean = false;
  selectedSecRoles: SecRole[];
  submitted: boolean;
  private sub: any;
  secRoleValidation: FormGroup;

  /* SecPrivilege Relation */
  secPrivileges: SecPrivilege[];
  selectedSecPrivileges: SecPrivilege[];
  secPrivilegeDialog: boolean;
  totalRecordsSecPrivilege: number;


  constructor(private route: ActivatedRoute,
              private el: ElementRef,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private router: Router,
	            private _location: Location,
              private secRoleService: SecRoleService,
              private secPrivilegeService: SecPrivilegeService,

               ) { }

  ngOnInit(): void {
    this.secRole=new SecRole;
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; 
      //console.log(this.id);

      this.secRoleService.get(this.id).subscribe({
        next: (res: SecRole) => {
          this.secRole = res;
	  /*Per le Date effettuare questa operazione per vedere il calendar
          this.secRole.dataSecRole = new Date(this.secRole.dataSecRole);
	  */

          this.loading = false;
          console.log(this.secRole);
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

    /* SecPrivilege Enable Preparation */
    if(!this.secPrivileges){
      this.secPrivilegeService.getAll().subscribe({
        next: (res: SecPrivilege[]) => {
          /*Rimuovo elementi già associati ad SecRole */
          this.totalRecordsSecPrivilege = res.length;
          this.secPrivileges = DataUtils.removeSameCommonElements(res,this.secRole.secPrivileges);        },
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

    if(this.secRoleValidation.status=="VALID"){
     if (this.secRole.id) {
      
      this.secRoleService.update(this.secRole).subscribe({
        next: (res) => {
          //console.log(res);
          this.messageService.add({ severity: 'success', summary: 'Fatto', detail: 'SecRole aggiornato', life: 3000 });
        },
        complete: () => { 
          this.edit=false;
          this.submitted = false;
          let myTag = this.el.nativeElement.querySelector("i");
          this.closeIcon();
        },
        error: (e) => {
          console.log("Error: ",e);
          this.messageService.add({ severity: 'error', summary: 'Attenzione', detail: 'SecRole non modificato', life: 3000 });
        }
      });
    }
   }
  }

  startValidator(){
    this.secRoleValidation = new FormGroup({
      id: new FormControl(this.secRole.id, Validators.compose([
      ])),

      name: new FormControl(this.secRole.name, Validators.compose([
        Validators.required,
      ])),


   });
   //console.log(this.secRoleValidation);
   
  }

  getValidationMessage(secRoleValidationField){
    return FormUtils.getValidationMessage(secRoleValidationField);
  }

  deleteElement(secRole: SecRole, messageOn: boolean = true) {
    this.confirmationService.confirm({
      message: 'Sei sicuro di voler eliminare l \'elemento selezionato ?',
      header: 'Conferma',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.secRoleService.delete(secRole.id).subscribe({
          next: (res) => {
            if(messageOn)
            this.messageService.add({ severity: 'success', summary: 'Fatto', detail: 'SecRole eliminato', life: 3000 });
            this.router.navigate(['/secRole']);
          },
          complete: () => { },
          error: (e) => {
            console.log(e);
            this.messageService.add({ severity: 'error', summary: 'Attenzione', detail: 'SecRole non eliminato', life: 3000 });
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

  /* SecPrivilege Edit Utils */
  removeSecPrivilege(secPrivilege:SecPrivilege){
    this.secPrivileges.push(secPrivilege);
    var result = new Map(this.secRole.secPrivileges.map(i => [i.id, i]));
    result.delete(secPrivilege.id);
    this.secRole.secPrivileges=Array.from( result.values() );
  }
  setSecPrivileges(){
    this.secPrivilegeDialog = true;
  }
  addSecPrivilegesToSecRole(){
    for(var i = 0; i < this.selectedSecPrivileges.length ; i++){
      this.secRole.secPrivileges.push(this.selectedSecPrivileges[i]);
      this.secPrivileges = DataUtils.removeSameCommonElements(this.secPrivileges,this.secRole.secPrivileges);
    }
    this.selectedSecPrivileges=[];
    this.secPrivilegeDialog = false;
  }
  hideDialogSecPrivilege() {
    this.secPrivilegeDialog = false;
  }


}
