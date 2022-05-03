import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService, SortEvent } from 'primeng/api';
import { Negozio } from 'src/app/models/negozio.model';
import { Paginator } from 'src/app/models/paginator.model';
import { NegozioService } from 'src/app/services/negozio.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from 'src/app/utils/form.utils';
import { SecurityService } from 'src/app/services/security.service';
import { DataUtils } from 'src/app/utils/data.utils';
import { SecUtils } from 'src/app/security/security.utils';


@Component({
  selector: 'app-negozio',
  templateUrl: './negozio.component.html',
  styleUrls: ['./negozio.component.css']
})
export class NegozioComponent implements OnInit {

  negozioDialog: boolean;
  negozios: Negozio[];
  negozio: Negozio;
  selectedNegozios: Negozio[];
  submitted: boolean;
  totalRecords: number;
  loading: boolean;
  defaultRows: number = 10;
  errorCode:any;
  negozioValidation: FormGroup;

  //authMap : Map<String,boolean> = new Map;

  constructor(private negozioService: NegozioService, 
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
    this.negozio = {};
    this.submitted = false;
    this.negozioDialog = true;
  }

  deleteSelectedElements() {
    this.confirmationService.confirm({
      message: 'Sei sicuro di voler eliminare gll elementi selezionati?',
      header: 'Conferma',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.negozioService.deleteAll(this.selectedNegozios).subscribe({
          next: (res) => {
            console.log(res);
            this.negozios = this.negozios.filter(val => !this.selectedNegozios.includes(val));
            this.selectedNegozios = null;
          },
          complete: () => { 
            this.messageService.add({ severity: 'success', summary: 'Fatto', detail: 'Negozios eliminati', life: 3000 });
          },
          error: (e) => { 
            this.errorCode=e.status;
            console.error(e);
          }
        });
        
      }
    });
  }

  editElement(negozio: Negozio) {
    this.negozio = negozio;
    /*
    In caso di campi Date va fatta questa operazione
    this.negozio.datanegozio = new Date(negozio.datanegozio);
    */
    this.negozioDialog = true;
  }

  deleteElement(negozio: Negozio, messageOn: boolean = true) {
    this.confirmationService.confirm({
      message: 'Sei sicuro di voler eliminare l \'elemento selezionato?',
      header: 'Conferma',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.negozios = this.negozios.filter(val => val.id !== negozio.id);
        this.negozioService.delete(negozio.id).subscribe({
          next: (res) => {
            console.log(res);
            this.negozio = {};
            if(messageOn)
            this.messageService.add({ severity: 'success', summary: 'Fatto', detail: 'Negozio eliminato', life: 3000 });
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
    this.negozioDialog = false;
    this.submitted = false;
  }

  saveElement() {
    this.submitted = true;
    this.startValidator();

    if(this.negozioValidation.status=="VALID"){
      if (this.negozio.id) {
        //this.negozios[this.findIndexById(this.negozio.id)] = this.negozio;
        this.negozioService.update(this.negozio).subscribe({
          next: (res) => {
            console.log(res);
            this.messageService.add({ severity: 'success', summary: 'Fatto', detail: 'Negozio aggiornato', life: 3000 });
          },
          complete: () => { },
          error: (e) => { 
            this.errorCode=e.status;
            console.error(e);
          }
        });
      }
      else {
        //console.log(this.negozio);
        this.negozioService.create(this.negozio).subscribe({
          next: (res) => {
            //console.log(res);
            this.loadList(0, this.defaultRows, 1, "id");
          },
          complete: () => { 
            this.messageService.add({ severity: 'success', summary: 'Fatto', detail: 'Negozio Creato', life: 3000 });
          },
          error: (e) => { 
	   this.errorCode=e.status;
	   console.error(e);
          }
        });

      }

      this.negozios = [...this.negozios];
      this.negozioDialog = false;
      this.negozio = {};
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
      event.sortField = "id";
    }
    this.loadList(currentPage, event.rows, event.sortOrder, event.sortField);

  }

  loadList(currentPage: number, size: number, sortOrder: number, sortField: string) {
    this.negozioService.getPaginated(currentPage, size, sortOrder, sortField).subscribe({
      next: (res: Paginator) => {
        this.negozios = res.content;
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

  detailElement(negozio: Negozio) {
    //console.log(negozio);
    this.router.navigate(['/negozio-details', negozio.id]);
  }

  downloadReport(type: string){
      this.negozioService.getReport(type)
        .subscribe(x => {
            var newBlob = new Blob([x], { type: "application/pdf" });
            const data = window.URL.createObjectURL(newBlob);
            
            var link = document.createElement('a');
            link.href = data;
            link.download = "negozio."+type;
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
    //return this.authMap.get("negozio"+SecUtils.authMap.get(operation));
    return true;
  }

}
