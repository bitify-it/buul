import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccessComponent } from './components/access/access.component';
import { MonitoringComponent } from './components/monitoring/monitoring.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { SecPrivilegeDetailComponent } from './components/security/sec-privilege-detail/sec-privilege-detail.component';
import { SecPrivilegeComponent } from './components/security/sec-privilege/sec-privilege.component';
import { SecRoleDetailComponent } from './components/security/sec-role-detail/sec-role-detail.component';
import { SecRoleComponent } from './components/security/sec-role/sec-role.component';
import { SecUserDetailComponent } from './components/security/sec-user-detail/sec-user-detail.component';
import { SecUserComponent } from './components/security/sec-user/sec-user.component';
import { FioreComponent } from './components/fiore/fiore.component';
import { FioreDetailComponent } from './components/fiore-detail/fiore-detail.component';
import { NegozioComponent } from './components/negozio/negozio.component';
import { NegozioDetailComponent } from './components/negozio-detail/negozio-detail.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'error/:code', component: ErrorPageComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: 'dashboard', component: DashboardComponent, 
    data:{breadcrumb: [
      {label: 'Dashboard',routerLink: '',class: 'breadcrumb-item',active: true, icon: 'pi pi-home'}
    ]}
  },
  { path: 'access', component: AccessComponent, 
    data:{breadcrumb: [
      {label: 'Dashboard',routerLink: '/',class: 'breadcrumb-item',active: false,icon: 'pi pi-home'},
      {label: 'Accesso',routerLink: '/access',class: 'breadcrumb-item',active: true, icon: 'pi pi-lock'}
    ]}
  },
  { path: 'monitoring', component: MonitoringComponent,
    data:{breadcrumb: [
      {label: 'Dashboard',routerLink: '/',class: 'breadcrumb-item',active: false,icon: 'pi pi-home'},
      {label: 'Monitoraggio',routerLink: '',class: 'breadcrumb-item',active: true}
    ]}
  },
  { path: 'sec-user', component: SecUserComponent, 
    data:{breadcrumb: [
        {label: 'Dashboard',routerLink: '/',class: 'breadcrumb-item',active: false,icon: 'pi pi-home'},
        {label: 'SecUser',routerLink: '',active: true, class: 'breadcrumb-item active' }
    ]}
  },  { path: 'sec-user-details/:id', component: SecUserDetailComponent,
    data:{breadcrumb: [
      {label: 'Dashboard',routerLink: '/',class: 'breadcrumb-item',active: false,icon: 'pi pi-home'},
      {label: 'SecUser',routerLink: '/sec-user',active: false, class: 'breadcrumb-item' },
      {label: 'SecUser Details',routerLink: '',active: true, class: 'breadcrumb-item active' }
    ]}
  },  { path: 'sec-role', component: SecRoleComponent, 
    data:{breadcrumb: [
        {label: 'Dashboard',routerLink: '/',class: 'breadcrumb-item',active: false,icon: 'pi pi-home'},
        {label: 'Ruoli',routerLink: '',active: true, class: 'breadcrumb-item active' }
    ]}
  },  { path: 'sec-role-details/:id', component: SecRoleDetailComponent,
    data:{breadcrumb: [
      {label: 'Dashboard',routerLink: '/',class: 'breadcrumb-item',active: false,icon: 'pi pi-home'},
      {label: 'Ruoli',routerLink: '/sec-role',active: false, class: 'breadcrumb-item' },
      {label: 'Dettaglio',routerLink: '',active: true, class: 'breadcrumb-item active' }
    ]}
  },  { path: 'sec-privilege', component: SecPrivilegeComponent, 
    data:{breadcrumb: [
        {label: 'Dashboard',routerLink: '/',class: 'breadcrumb-item',active: false,icon: 'pi pi-home'},
        {label: 'Privilegi',routerLink: '',active: true, class: 'breadcrumb-item active' }
    ]}
  },  { path: 'sec-privilege-details/:id', component: SecPrivilegeDetailComponent,
    data:{breadcrumb: [
      {label: 'Dashboard',routerLink: '/',class: 'breadcrumb-item',active: false,icon: 'pi pi-home'},
      {label: 'Privilegi',routerLink: '/sec-privilege',active: false, class: 'breadcrumb-item' },
      {label: 'Dettaglio',routerLink: '',active: true, class: 'breadcrumb-item active' }
    ]}
  },
  { path: 'fiore', component: FioreComponent, 
    data:{breadcrumb: [
        {label: 'Dashboard',routerLink: '/',class: 'breadcrumb-item',active: false,icon: 'pi pi-home'},
        {label: 'Fiore',routerLink: '',active: true, class: 'breadcrumb-item active' }
    ]}
  },  { path: 'fiore-details/:id', component: FioreDetailComponent,
    data:{breadcrumb: [
      {label: 'Dashboard',routerLink: '/',class: 'breadcrumb-item',active: false,icon: 'pi pi-home'},
      {label: 'Fiore',routerLink: '/fiore',active: false, class: 'breadcrumb-item' },
      {label: 'Fiore Details',routerLink: '',active: true, class: 'breadcrumb-item active' }
    ]}
  },  { path: 'negozio', component: NegozioComponent, 
    data:{breadcrumb: [
        {label: 'Dashboard',routerLink: '/',class: 'breadcrumb-item',active: false,icon: 'pi pi-home'},
        {label: 'Negozio',routerLink: '',active: true, class: 'breadcrumb-item active' }
    ]}
  },  { path: 'negozio-details/:id', component: NegozioDetailComponent,
    data:{breadcrumb: [
      {label: 'Dashboard',routerLink: '/',class: 'breadcrumb-item',active: false,icon: 'pi pi-home'},
      {label: 'Negozio',routerLink: '/negozio',active: false, class: 'breadcrumb-item' },
      {label: 'Negozio Details',routerLink: '',active: true, class: 'breadcrumb-item active' }
    ]}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
