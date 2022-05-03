import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { SecUtils } from 'src/app/security/security.utils';
import { SecurityService } from 'src/app/services/security.service';
import { DataUtils } from 'src/app/utils/data.utils';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


    items: MenuItem[];
    secVisible = false;
    settingsVisible = false;
    authMap : Map<String,boolean> = new Map;

    constructor(
        private secService : SecurityService,
        ) {
            //this.initPrivileges();

        }

    ngOnInit() {
        this.items = [
            {
            label: 'Dashboard', icon:'pi pi-home', routerLink: ['/dashboard']
            },
            {
            label: 'Sezioni',
            icon:'pi pi-fw pi-star',
            items: [
                {label: 'Fiore',icon:'pi pi-fw pi-chevron-right', routerLink: ['/fiore']},
                {label: 'Negozio',icon:'pi pi-fw pi-chevron-right', routerLink: ['/negozio']},

            ]
            },
            /*
            {
                label: 'Sicurezza',
                icon:'pi pi-fw pi-lock',
                //visible:this.secVisible,
                items:[
                    {label: 'Utenti',icon:'pi pi-fw pi-chevron-right', routerLink: ['/sec-user']},
                    {label: 'Ruoli',icon:'pi pi-fw pi-chevron-right', routerLink: ['/sec-role']},
                    {label: 'Privilegi',icon:'pi pi-fw pi-chevron-right', routerLink: ['/sec-privilege']},
                ]
            },
            */
            {
            label: 'Impostazioni',
            icon:'pi pi-fw pi-cog',
            //visible:this.settingsVisible,
	        items: [
                {
                    label: 'Monitoraggio',
                    icon:'pi pi-fw pi-chart-line',
                    routerLink: ['/monitoring'],
                },
                {
                    label: 'Configurazione',
                    icon:'pi pi-fw pi-list'
                }
            ]
            }
        ]
    }

    setMenuVisibility(){
        //Sicurezza
        if(this.authMap.get("ROLE_ADMIN")){this.secVisible = true;}
        //Impostazioni
        if(this.authMap.get("ROLE_ADMIN")){this.settingsVisible = true;}

        this.ngOnInit();
    }

    initPrivileges(){
        this.secService.getPrivileges().subscribe({
          next: (res) => {
            this.authMap = DataUtils.authArrayToHashmap(res);
            console.log("Sec: ",this.authMap);
            this.setMenuVisibility();
          },
          complete: () => { },
          error: (e) => {
              console.error(e); 
              this.secVisible=false;
              this.settingsVisible=false;
              this.ngOnInit();
            }
        });
      }

}
