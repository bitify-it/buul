import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import {Location} from '@angular/common';
import { Fiore } from 'src/app/models/fiore.model';
import { FioreService } from 'src/app/services/fiore.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from 'src/app/utils/form.utils';
import { SecurityService } from 'src/app/services/security.service';
import { DataUtils } from 'src/app/utils/data.utils';
import { SecUtils } from 'src/app/security/security.utils';
import { NegozioService } from 'src/app/services/negozio.service';
import { Negozio} from 'src/app/models/negozio.model';



@Component({
  selector: 'app-fiore-detail',
  templateUrl: './fiore-detail.component.html',
  styleUrls: ['./fiore-detail.component.css']
})
export class FioreDetailComponent implements OnInit {

  id: number;
  fiore: Fiore;
  loading: boolean = true;
  edit: boolean = false;
  selectedFiores: Fiore[];
  submitted: boolean;
  private sub: any;
  fioreValidation: FormGroup;

  /* Negozio Relation */
  negozios: Negozio[];
  selectedNegozios: Negozio[];
  negozioDialog: boolean;
  totalRecordsNegozio: number;


//authMap : Map<String,boolean> = new Map;

  constructor(private route: ActivatedRoute,
              private el: ElementRef,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private router: Router,
              private secService : SecurityService,
	            private _location: Location,
              private fioreService: FioreService,
              private negozioService: NegozioService,

               ) { }

  ngOnInit(): void {
    //this.initPrivileges();
    this.fiore=new Fiore;
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; 
      //console.log(this.id);

      this.fioreService.get(this.id).subscribe({
        next: (res: Fiore) => {
          this.fiore = res;
	  /*Per le Date effettuare questa operazione per vedere il calendar
          this.fiore.dataFiore = new Date(this.fiore.dataFiore);
	  */

          this.loading = false;
          console.log(this.fiore);
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

    /* Negozio Enable Preparation */
    if(!this.negozios){
      this.negozioService.getAll().subscribe({
        next: (res: Negozio[]) => {
          /*Rimuovo elementi già associati ad Fiore */
          this.totalRecordsNegozio = res.length;
          this.negozios = DataUtils.removeSameCommonElements(res,this.fiore.negozios);        },
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

    if(this.fioreValidation.status=="VALID"){
     if (this.fiore.fioreId) {
      
      this.fioreService.update(this.fiore).subscribe({
        next: (res) => {
          //console.log(res);
          this.messageService.add({ severity: 'success', summary: 'Fatto', detail: 'Fiore aggiornato', life: 3000 });
        },
        complete: () => { 
          this.edit=false;
          this.submitted = false;
          let myTag = this.el.nativeElement.querySelector("i");
          this.closeIcon();
        },
        error: (e) => {
          console.log("Error: ",e);
          this.messageService.add({ severity: 'error', summary: 'Attenzione', detail: 'Fiore non modificato', life: 3000 });
        }
      });
    }
   }
  }

  startValidator(){
    this.fioreValidation = new FormGroup({
      fioreId: new FormControl(this.fiore.fioreId, Validators.compose([
      ])),

      nome: new FormControl(this.fiore.nome, Validators.compose([
      ])),

      prezzo: new FormControl(this.fiore.prezzo, Validators.compose([
      ])),


   });
   //console.log(this.fioreValidation);
   
  }

  getValidationMessage(fioreValidationField){
    return FormUtils.getValidationMessage(fioreValidationField);
  }

  deleteElement(fiore: Fiore, messageOn: boolean = true) {
    this.confirmationService.confirm({
      message: 'Sei sicuro di voler eliminare l \'elemento selezionato ?',
      header: 'Conferma',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.fioreService.delete(fiore.fioreId).subscribe({
          next: (res) => {
            if(messageOn)
            this.messageService.add({ severity: 'success', summary: 'Fatto', detail: 'Fiore eliminato', life: 3000 });
            this.router.navigate(['/fiore']);
          },
          complete: () => { },
          error: (e) => {
            console.log(e);
            this.messageService.add({ severity: 'error', summary: 'Attenzione', detail: 'Fiore non eliminato', life: 3000 });
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

  /* Negozio Edit Utils */
  removeNegozio(negozio:Negozio){
    this.negozios.push(negozio);
    var result = new Map(this.fiore.negozios.map(i => [i.id, i]));
    result.delete(negozio.id);
    this.fiore.negozios=Array.from( result.values() );
  }
  setNegozios(){
    this.negozioDialog = true;
  }
  addNegoziosToFiore(){
    for(var i = 0; i < this.selectedNegozios.length ; i++){
      this.fiore.negozios.push(this.selectedNegozios[i]);
      this.negozios = DataUtils.removeSameCommonElements(this.negozios,this.fiore.negozios);
    }
    this.selectedNegozios=[];
    this.negozioDialog = false;
  }
  hideDialogNegozio() {
    this.negozioDialog = false;
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
    //return this.authMap.get("fiore"+SecUtils.authMap.get(operation));
    return true;

  }

}
