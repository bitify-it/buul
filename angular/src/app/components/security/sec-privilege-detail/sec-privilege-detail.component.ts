import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import {Location} from '@angular/common';
import { SecPrivilege } from 'src/app/models/sec-privilege.model';
import { SecPrivilegeService } from 'src/app/services/sec-privilege.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from 'src/app/utils/form.utils';
import { DataUtils } from 'src/app/utils/data.utils';



@Component({
  selector: 'app-sec-privilege-detail',
  templateUrl: './sec-privilege-detail.component.html',
  styleUrls: ['./sec-privilege-detail.component.css']
})
export class SecPrivilegeDetailComponent implements OnInit {

  id: number;
  secPrivilege: SecPrivilege;
  loading: boolean = true;
  edit: boolean = false;
  selectedSecPrivileges: SecPrivilege[];
  submitted: boolean;
  private sub: any;
  secPrivilegeValidation: FormGroup;



  constructor(private route: ActivatedRoute,
              private el: ElementRef,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private router: Router,
	            private _location: Location,
              private secPrivilegeService: SecPrivilegeService,

               ) { }

  ngOnInit(): void {
    this.secPrivilege=new SecPrivilege;
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; 
      //console.log(this.id);

      this.secPrivilegeService.get(this.id).subscribe({
        next: (res: SecPrivilege) => {
          this.secPrivilege = res;
	  /*Per le Date effettuare questa operazione per vedere il calendar
          this.secPrivilege.dataSecPrivilege = new Date(this.secPrivilege.dataSecPrivilege);
	  */

          this.loading = false;
          console.log(this.secPrivilege);
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

    this.loading=false;

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

    if(this.secPrivilegeValidation.status=="VALID"){
     if (this.secPrivilege.id) {
      
      this.secPrivilegeService.update(this.secPrivilege).subscribe({
        next: (res) => {
          //console.log(res);
          this.messageService.add({ severity: 'success', summary: 'Fatto', detail: 'SecPrivilege aggiornato', life: 3000 });
        },
        complete: () => { 
          this.edit=false;
          this.submitted = false;
          let myTag = this.el.nativeElement.querySelector("i");
          this.closeIcon();
        },
        error: (e) => {
          console.log("Error: ",e);
          this.messageService.add({ severity: 'error', summary: 'Attenzione', detail: 'SecPrivilege non modificato', life: 3000 });
        }
      });
    }
   }
  }

  startValidator(){
    this.secPrivilegeValidation = new FormGroup({
      id: new FormControl(this.secPrivilege.id, Validators.compose([
      ])),

      name: new FormControl(this.secPrivilege.name, Validators.compose([
        Validators.required,
      ])),


   });
   //console.log(this.secPrivilegeValidation);
   
  }

  getValidationMessage(secPrivilegeValidationField){
    return FormUtils.getValidationMessage(secPrivilegeValidationField);
  }

  deleteElement(secPrivilege: SecPrivilege, messageOn: boolean = true) {
    this.confirmationService.confirm({
      message: 'Sei sicuro di voler eliminare l \'elemento selezionato ?',
      header: 'Conferma',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.secPrivilegeService.delete(secPrivilege.id).subscribe({
          next: (res) => {
            if(messageOn)
            this.messageService.add({ severity: 'success', summary: 'Fatto', detail: 'SecPrivilege eliminato', life: 3000 });
            this.router.navigate(['/secPrivilege']);
          },
          complete: () => { },
          error: (e) => {
            console.log(e);
            this.messageService.add({ severity: 'error', summary: 'Attenzione', detail: 'SecPrivilege non eliminato', life: 3000 });
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



}
