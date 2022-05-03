import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import {Location} from '@angular/common';
import { Negozio } from 'src/app/models/negozio.model';
import { NegozioService } from 'src/app/services/negozio.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from 'src/app/utils/form.utils';
import { SecurityService } from 'src/app/services/security.service';
import { DataUtils } from 'src/app/utils/data.utils';
import { SecUtils } from 'src/app/security/security.utils';



@Component({
  selector: 'app-negozio-detail',
  templateUrl: './negozio-detail.component.html',
  styleUrls: ['./negozio-detail.component.css']
})
export class NegozioDetailComponent implements OnInit {

  id: number;
  negozio: Negozio;
  loading: boolean = true;
  edit: boolean = false;
  selectedNegozios: Negozio[];
  submitted: boolean;
  private sub: any;
  negozioValidation: FormGroup;



//authMap : Map<String,boolean> = new Map;

  constructor(private route: ActivatedRoute,
              private el: ElementRef,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private router: Router,
              private secService : SecurityService,
	            private _location: Location,
              private negozioService: NegozioService,

               ) { }

  ngOnInit(): void {
    //this.initPrivileges();
    this.negozio=new Negozio;
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; 
      //console.log(this.id);

      this.negozioService.get(this.id).subscribe({
        next: (res: Negozio) => {
          this.negozio = res;
	  /*Per le Date effettuare questa operazione per vedere il calendar
          this.negozio.dataNegozio = new Date(this.negozio.dataNegozio);
	  */

          this.loading = false;
          console.log(this.negozio);
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

    if(this.negozioValidation.status=="VALID"){
     if (this.negozio.id) {
      
      this.negozioService.update(this.negozio).subscribe({
        next: (res) => {
          //console.log(res);
          this.messageService.add({ severity: 'success', summary: 'Fatto', detail: 'Negozio aggiornato', life: 3000 });
        },
        complete: () => { 
          this.edit=false;
          this.submitted = false;
          let myTag = this.el.nativeElement.querySelector("i");
          this.closeIcon();
        },
        error: (e) => {
          console.log("Error: ",e);
          this.messageService.add({ severity: 'error', summary: 'Attenzione', detail: 'Negozio non modificato', life: 3000 });
        }
      });
    }
   }
  }

  startValidator(){
    this.negozioValidation = new FormGroup({
      id: new FormControl(this.negozio.id, Validators.compose([
      ])),


   });
   //console.log(this.negozioValidation);
   
  }

  getValidationMessage(negozioValidationField){
    return FormUtils.getValidationMessage(negozioValidationField);
  }

  deleteElement(negozio: Negozio, messageOn: boolean = true) {
    this.confirmationService.confirm({
      message: 'Sei sicuro di voler eliminare l \'elemento selezionato ?',
      header: 'Conferma',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.negozioService.delete(negozio.id).subscribe({
          next: (res) => {
            if(messageOn)
            this.messageService.add({ severity: 'success', summary: 'Fatto', detail: 'Negozio eliminato', life: 3000 });
            this.router.navigate(['/negozio']);
          },
          complete: () => { },
          error: (e) => {
            console.log(e);
            this.messageService.add({ severity: 'error', summary: 'Attenzione', detail: 'Negozio non eliminato', life: 3000 });
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



  /*
  initPrivileges(){
    this.secService.getPrivileges().subscribe({
      next: (res) => {
        this.authMap = DataUtils.authArrayToHashmap(res);
        //console.log("Sec: ",this.authMap);
      },
      complete: () => { },
      error: (e) => {console.error(e); }
    });
  }
  */

  secCheck(operation){
    //console.log("OP:",operation);
    //return this.authMap.get("negozio"+SecUtils.authMap.get(operation));
    return true;

  }

}
