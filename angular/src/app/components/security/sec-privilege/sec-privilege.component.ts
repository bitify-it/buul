import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService, SortEvent } from 'primeng/api';
import { SecPrivilege } from 'src/app/models/sec-privilege.model';
import { Paginator } from 'src/app/models/paginator.model';
import { SecPrivilegeService } from 'src/app/services/sec-privilege.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from 'src/app/utils/form.utils';


@Component({
  selector: 'app-sec-privilege',
  templateUrl: './sec-privilege.component.html',
  styleUrls: ['./sec-privilege.component.css']
})
export class SecPrivilegeComponent implements OnInit {

  secPrivilegeDialog: boolean;
  secPrivileges: SecPrivilege[];
  secPrivilege: SecPrivilege;
  selectedSecPrivileges: SecPrivilege[];
  submitted: boolean;
  totalRecords: number;
  loading: boolean;
  defaultRows: number = 25;
  errorCode:any;
  secPrivilegeValidation: FormGroup;

  constructor(private secPrivilegeService: SecPrivilegeService, 
              private messageService: MessageService, 
              private confirmationService: ConfirmationService,
              private router: Router
              ) { }

  ngOnInit() {
    console.log("Init");
  }

  openNew() {
    this.secPrivilege = {};
    this.submitted = false;
    this.secPrivilegeDialog = true;
  }

  deleteSelectedElements() {
    this.confirmationService.confirm({
      message: 'Sei sicuro di voler eliminare gll elementi selezionati?',
      header: 'Conferma',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.secPrivilegeService.deleteAll(this.selectedSecPrivileges).subscribe({
          next: (res) => {
            console.log(res);
            this.secPrivileges = this.secPrivileges.filter(val => !this.selectedSecPrivileges.includes(val));
            this.selectedSecPrivileges = null;
          },
          complete: () => { 
            this.messageService.add({ severity: 'success', summary: 'Fatto', detail: 'SecPrivileges eliminati', life: 3000 });
          },
          error: (e) => { 
            this.errorCode=e.status;
            console.error(e);
          }
        });
        
      }
    });
  }

  editElement(secPrivilege: SecPrivilege) {
    this.secPrivilege = secPrivilege;
    /*
    In caso di campi Date va fatta questa operazione
    this.secPrivilege.datasecPrivilege = new Date(secPrivilege.datasecPrivilege);
    */
    this.secPrivilegeDialog = true;
  }

  deleteElement(secPrivilege: SecPrivilege, messageOn: boolean = true) {
    this.confirmationService.confirm({
      message: 'Sei sicuro di voler eliminare l \'elemento selezionato?',
      header: 'Conferma',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.secPrivileges = this.secPrivileges.filter(val => val.id !== secPrivilege.id);
        this.secPrivilegeService.delete(secPrivilege.id).subscribe({
          next: (res) => {
            console.log(res);
            this.secPrivilege = {};
            if(messageOn)
            this.messageService.add({ severity: 'success', summary: 'Fatto', detail: 'SecPrivilege eliminato', life: 3000 });
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
    this.secPrivilegeDialog = false;
    this.submitted = false;
  }

  saveElement() {
    this.submitted = true;
    this.startValidator();

    if(this.secPrivilegeValidation.status=="VALID"){
      if (this.secPrivilege.id) {
        //this.secPrivileges[this.findIndexById(this.secPrivilege.id)] = this.secPrivilege;
        this.secPrivilegeService.update(this.secPrivilege).subscribe({
          next: (res) => {
            console.log(res);
            this.messageService.add({ severity: 'success', summary: 'Fatto', detail: 'SecPrivilege aggiornato', life: 3000 });
          },
          complete: () => { },
          error: (e) => { 
            this.errorCode=e.status;
            console.error(e);
          }
        });
      }
      else {
        //console.log(this.secPrivilege);
        this.secPrivilegeService.create(this.secPrivilege).subscribe({
          next: (res) => {
            //console.log(res);
            this.loadList(0, this.defaultRows, 1, "id");
          },
          complete: () => { 
            this.messageService.add({ severity: 'success', summary: 'Fatto', detail: 'SecPrivilege Creato', life: 3000 });
          },
          error: (e) => { 
	   this.errorCode=e.status;
	   console.error(e);
          }
        });

      }

      this.secPrivileges = [...this.secPrivileges];
      this.secPrivilegeDialog = false;
      this.secPrivilege = {};
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
    this.secPrivilegeService.getPaginated(currentPage, size, sortOrder, sortField).subscribe({
      next: (res: Paginator) => {
        this.secPrivileges = res.content;
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

  detailElement(secPrivilege: SecPrivilege) {
    //console.log(secPrivilege);
    this.router.navigate(['/sec-privilege-details', secPrivilege.id]);
  }

  downloadReport(type: string){
      this.secPrivilegeService.getReport(type)
        .subscribe(x => {
            var newBlob = new Blob([x], { type: "application/pdf" });
            const data = window.URL.createObjectURL(newBlob);
            
            var link = document.createElement('a');
            link.href = data;
            link.download = "secPrivilege."+type;
            // this is necessary as link.click() does not work on the latest firefox
            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
            
            setTimeout(function () {
                // For Firefox it is necessary to delay revoking the ObjectURL
                window.URL.revokeObjectURL(data);
                link.remove();
            }, 100);
        });
  }

}
