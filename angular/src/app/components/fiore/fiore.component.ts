import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService, SortEvent } from 'primeng/api';
import { Fiore } from 'src/app/models/fiore.model';
import { Paginator } from 'src/app/models/paginator.model';
import { FioreService } from 'src/app/services/fiore.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from 'src/app/utils/form.utils';
import { SecurityService } from 'src/app/services/security.service';
import { DataUtils } from 'src/app/utils/data.utils';
import { SecUtils } from 'src/app/security/security.utils';


@Component({
  selector: 'app-fiore',
  templateUrl: './fiore.component.html',
  styleUrls: ['./fiore.component.css']
})
export class FioreComponent implements OnInit {

  fioreDialog: boolean;
  fiores: Fiore[];
  fiore: Fiore;
  selectedFiores: Fiore[];
  submitted: boolean;
  totalRecords: number;
  loading: boolean;
  defaultRows: number = 10;
  errorCode:any;
  fioreValidation: FormGroup;

  //authMap : Map<String,boolean> = new Map;

  constructor(private fioreService: FioreService, 
              private messageService: MessageService, 
              private confirmationService: ConfirmationService,
              private secService : SecurityService,
              private router: Router
              ) { }

  ngOnInit() {
    //console.log("Init");
    //this.initPrivileges();
  }

  openNew() {
    this.fiore = {};
    this.submitted = false;
    this.fioreDialog = true;
  }

  deleteSelectedElements() {
    this.confirmationService.confirm({
      message: 'Sei sicuro di voler eliminare gll elementi selezionati?',
      header: 'Conferma',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.fioreService.deleteAll(this.selectedFiores).subscribe({
          next: (res) => {
            console.log(res);
            this.fiores = this.fiores.filter(val => !this.selectedFiores.includes(val));
            this.selectedFiores = null;
          },
          complete: () => { 
            this.messageService.add({ severity: 'success', summary: 'Fatto', detail: 'Fiores eliminati', life: 3000 });
          },
          error: (e) => { 
            this.errorCode=e.status;
            console.error(e);
          }
        });
        
      }
    });
  }

  editElement(fiore: Fiore) {
    this.fiore = fiore;
    /*
    In caso di campi Date va fatta questa operazione
    this.fiore.datafiore = new Date(fiore.datafiore);
    */
    this.fioreDialog = true;
  }

  deleteElement(fiore: Fiore, messageOn: boolean = true) {
    this.confirmationService.confirm({
      message: 'Sei sicuro di voler eliminare l \'elemento selezionato?',
      header: 'Conferma',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.fiores = this.fiores.filter(val => val.fioreId !== fiore.fioreId);
        this.fioreService.delete(fiore.fioreId).subscribe({
          next: (res) => {
            console.log(res);
            this.fiore = {};
            if(messageOn)
            this.messageService.add({ severity: 'success', summary: 'Fatto', detail: 'Fiore eliminato', life: 3000 });
          },
          complete: () => { },
          error: (e) => { 
            this.errorCode=e.status;
            console.error(e);
          }
        });
      }
    });
  }

  hideDialog() {
    this.fioreDialog = false;
    this.submitted = false;
  }

  saveElement() {
    this.submitted = true;
    this.startValidator();

    if(this.fioreValidation.status=="VALID"){
      if (this.fiore.fioreId) {
        //this.fiores[this.findIndexById(this.fiore.fioreId)] = this.fiore;
        this.fioreService.update(this.fiore).subscribe({
          next: (res) => {
            console.log(res);
            this.messageService.add({ severity: 'success', summary: 'Fatto', detail: 'Fiore aggiornato', life: 3000 });
          },
          complete: () => { },
          error: (e) => { 
            this.errorCode=e.status;
            console.error(e);
          }
        });
      }
      else {
        //console.log(this.fiore);
        this.fioreService.create(this.fiore).subscribe({
          next: (res) => {
            //console.log(res);
            this.loadList(0, this.defaultRows, 1, "fioreId");
          },
          complete: () => { 
            this.messageService.add({ severity: 'success', summary: 'Fatto', detail: 'Fiore Creato', life: 3000 });
          },
          error: (e) => { 
	   this.errorCode=e.status;
	   console.error(e);
          }
        });

      }

      this.fiores = [...this.fiores];
      this.fioreDialog = false;
      this.fiore = {};
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

  loadListEvent(event: LazyLoadEvent) {
    this.loading = true;

    console.log(event);
    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    let currentPage = event.first / event.rows;
    if (event.sortField == null || event.sortField == undefined) {
      event.sortField = "fioreId";
    }
    this.loadList(currentPage, event.rows, event.sortOrder, event.sortField);

  }

  loadList(currentPage: number, size: number, sortOrder: number, sortField: string) {
    this.fioreService.getPaginated(currentPage, size, sortOrder, sortField).subscribe({
      next: (res: Paginator) => {
        this.fiores = res.content;
        this.totalRecords = res.totalElements;
        this.loading = false;
        //console.log(res);
      },
      complete: () => { },
      error: (e) => { 
        this.errorCode=e.status;
        console.error(e);
      }
    });
  }

  detailElement(fiore: Fiore) {
    //console.log(fiore);
    this.router.navigate(['/fiore-details', fiore.fioreId]);
  }

  downloadReport(type: string){
      this.fioreService.getReport(type)
        .subscribe(x => {
            var newBlob = new Blob([x], { type: "application/pdf" });
            const data = window.URL.createObjectURL(newBlob);
            
            var link = document.createElement('a');
            link.href = data;
            link.download = "fiore."+type;
            // this is necessary as link.click() does not work on the latest firefox
            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
            
            setTimeout(function () {
                // For Firefox it is necessary to delay revoking the ObjectURL
                window.URL.revokeObjectURL(data);
                link.remove();
            }, 100);
        });
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
