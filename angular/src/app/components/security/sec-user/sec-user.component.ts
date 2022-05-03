import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService, SortEvent } from 'primeng/api';
import { SecUser } from 'src/app/models/sec-user.model';
import { Paginator } from 'src/app/models/paginator.model';
import { SecUserService } from 'src/app/services/sec-user.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from 'src/app/utils/form.utils';


@Component({
  selector: 'app-sec-user',
  templateUrl: './sec-user.component.html',
  styleUrls: ['./sec-user.component.css']
})
export class SecUserComponent implements OnInit {

  secUserDialog: boolean;
  secUsers: SecUser[];
  secUser: SecUser;
  selectedSecUsers: SecUser[];
  submitted: boolean;
  totalRecords: number;
  loading: boolean;
  defaultRows: number = 10;
  errorCode:any;
  secUserValidation: FormGroup;

  constructor(private secUserService: SecUserService, 
              private messageService: MessageService, 
              private confirmationService: ConfirmationService,
              private router: Router
              ) { }

  ngOnInit() {
    console.log("Init");
  }

  openNew() {
    this.secUser = {};
    this.submitted = false;
    this.secUserDialog = true;
  }

  deleteSelectedElements() {
    this.confirmationService.confirm({
      message: 'Sei sicuro di voler eliminare gll elementi selezionati?',
      header: 'Conferma',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.secUserService.deleteAll(this.selectedSecUsers).subscribe({
          next: (res) => {
            console.log(res);
            this.secUsers = this.secUsers.filter(val => !this.selectedSecUsers.includes(val));
            this.selectedSecUsers = null;
          },
          complete: () => { 
            this.messageService.add({ severity: 'success', summary: 'Fatto', detail: 'SecUsers eliminati', life: 3000 });
          },
          error: (e) => { 
            this.errorCode=e.status;
            console.error(e);
          }
        });
        
      }
    });
  }

  editElement(secUser: SecUser) {
    this.secUser = secUser;
    /*
    In caso di campi Date va fatta questa operazione
    this.secUser.datasecUser = new Date(secUser.datasecUser);
    */
    this.secUserDialog = true;
  }

  deleteElement(secUser: SecUser, messageOn: boolean = true) {
    this.confirmationService.confirm({
      message: 'Sei sicuro di voler eliminare l \'elemento selezionato?',
      header: 'Conferma',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.secUsers = this.secUsers.filter(val => val.id !== secUser.id);
        this.secUserService.delete(secUser.id).subscribe({
          next: (res) => {
            console.log(res);
            this.secUser = {};
            if(messageOn)
            this.messageService.add({ severity: 'success', summary: 'Fatto', detail: 'SecUser eliminato', life: 3000 });
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
    this.secUserDialog = false;
    this.submitted = false;
  }

  saveElement() {
    this.submitted = true;
    this.startValidator();

    if(this.secUserValidation.status=="VALID"){
      if (this.secUser.id) {
        //this.secUsers[this.findIndexById(this.secUser.id)] = this.secUser;
        this.secUserService.update(this.secUser).subscribe({
          next: (res) => {
            console.log(res);
            this.messageService.add({ severity: 'success', summary: 'Fatto', detail: 'SecUser aggiornato', life: 3000 });
          },
          complete: () => { },
          error: (e) => { 
            this.errorCode=e.status;
            console.error(e);
          }
        });
      }
      else {
        //console.log(this.secUser);
        this.secUserService.create(this.secUser).subscribe({
          next: (res) => {
            //console.log(res);
            this.loadList(0, this.defaultRows, 1, "id");
          },
          complete: () => { 
            this.messageService.add({ severity: 'success', summary: 'Fatto', detail: 'SecUser Creato', life: 3000 });
          },
          error: (e) => { 
	   this.errorCode=e.status;
	   console.error(e);
          }
        });

      }

      this.secUsers = [...this.secUsers];
      this.secUserDialog = false;
      this.secUser = {};
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
    this.secUserService.getPaginated(currentPage, size, sortOrder, sortField).subscribe({
      next: (res: Paginator) => {
        this.secUsers = res.content;
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

  detailElement(secUser: SecUser) {
    //console.log(secUser);
    this.router.navigate(['/sec-user-details', secUser.id]);
  }

  downloadReport(type: string){
      this.secUserService.getReport(type)
        .subscribe(x => {
            var newBlob = new Blob([x], { type: "application/pdf" });
            const data = window.URL.createObjectURL(newBlob);
            
            var link = document.createElement('a');
            link.href = data;
            link.download = "secUser."+type;
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
