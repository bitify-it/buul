import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService, SortEvent } from 'primeng/api';
import { SecRole } from 'src/app/models/sec-role.model';
import { Paginator } from 'src/app/models/paginator.model';
import { SecRoleService } from 'src/app/services/sec-role.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from 'src/app/utils/form.utils';


@Component({
  selector: 'app-sec-role',
  templateUrl: './sec-role.component.html',
  styleUrls: ['./sec-role.component.css']
})
export class SecRoleComponent implements OnInit {

  secRoleDialog: boolean;
  secRoles: SecRole[];
  secRole: SecRole;
  selectedSecRoles: SecRole[];
  submitted: boolean;
  totalRecords: number;
  loading: boolean;
  defaultRows: number = 10;
  errorCode:any;
  secRoleValidation: FormGroup;

  constructor(private secRoleService: SecRoleService, 
              private messageService: MessageService, 
              private confirmationService: ConfirmationService,
              private router: Router
              ) { }

  ngOnInit() {
    console.log("Init");
  }

  openNew() {
    this.secRole = {};
    this.submitted = false;
    this.secRoleDialog = true;
  }

  deleteSelectedElements() {
    this.confirmationService.confirm({
      message: 'Sei sicuro di voler eliminare gll elementi selezionati?',
      header: 'Conferma',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.secRoleService.deleteAll(this.selectedSecRoles).subscribe({
          next: (res) => {
            console.log(res);
            this.secRoles = this.secRoles.filter(val => !this.selectedSecRoles.includes(val));
            this.selectedSecRoles = null;
          },
          complete: () => { 
            this.messageService.add({ severity: 'success', summary: 'Fatto', detail: 'SecRoles eliminati', life: 3000 });
          },
          error: (e) => { 
            this.errorCode=e.status;
            console.error(e);
          }
        });
        
      }
    });
  }

  editElement(secRole: SecRole) {
    this.secRole = secRole;
    /*
    In caso di campi Date va fatta questa operazione
    this.secRole.datasecRole = new Date(secRole.datasecRole);
    */
    this.secRoleDialog = true;
  }

  deleteElement(secRole: SecRole, messageOn: boolean = true) {
    this.confirmationService.confirm({
      message: 'Sei sicuro di voler eliminare l \'elemento selezionato?',
      header: 'Conferma',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.secRoles = this.secRoles.filter(val => val.id !== secRole.id);
        this.secRoleService.delete(secRole.id).subscribe({
          next: (res) => {
            console.log(res);
            this.secRole = {};
            if(messageOn)
            this.messageService.add({ severity: 'success', summary: 'Fatto', detail: 'SecRole eliminato', life: 3000 });
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
    this.secRoleDialog = false;
    this.submitted = false;
  }

  saveElement() {
    this.submitted = true;
    this.startValidator();

    if(this.secRoleValidation.status=="VALID"){
      if (this.secRole.id) {
        //this.secRoles[this.findIndexById(this.secRole.id)] = this.secRole;
        this.secRoleService.update(this.secRole).subscribe({
          next: (res) => {
            console.log(res);
            this.messageService.add({ severity: 'success', summary: 'Fatto', detail: 'SecRole aggiornato', life: 3000 });
          },
          complete: () => { },
          error: (e) => { 
            this.errorCode=e.status;
            console.error(e);
          }
        });
      }
      else {
        //console.log(this.secRole);
        this.secRoleService.create(this.secRole).subscribe({
          next: (res) => {
            //console.log(res);
            this.loadList(0, this.defaultRows, 1, "id");
          },
          complete: () => { 
            this.messageService.add({ severity: 'success', summary: 'Fatto', detail: 'SecRole Creato', life: 3000 });
          },
          error: (e) => { 
	   this.errorCode=e.status;
	   console.error(e);
          }
        });

      }

      this.secRoles = [...this.secRoles];
      this.secRoleDialog = false;
      this.secRole = {};
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
    this.secRoleService.getPaginated(currentPage, size, sortOrder, sortField).subscribe({
      next: (res: Paginator) => {
        this.secRoles = res.content;
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

  detailElement(secRole: SecRole) {
    //console.log(secRole);
    this.router.navigate(['/sec-role-details', secRole.id]);
  }

  downloadReport(type: string){
      this.secRoleService.getReport(type)
        .subscribe(x => {
            var newBlob = new Blob([x], { type: "application/pdf" });
            const data = window.URL.createObjectURL(newBlob);
            
            var link = document.createElement('a');
            link.href = data;
            link.download = "secRole."+type;
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
