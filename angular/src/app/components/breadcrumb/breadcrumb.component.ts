import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuItemContent } from 'primeng/menu';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  constructor(private route: Router) {}

  items: MenuItem[] = [{ label: "Dashboard", icon: "pi pi-home", routerLink: "/"}];
  b: any;

  ngOnInit() {
    this.route.events.subscribe(event => {
      let breadcrumbItems: MenuItem[] = [];
      if (event instanceof NavigationEnd) {
        var snapshot = this.route.routerState.snapshot;
        this.b = snapshot.root.children[0].data['breadcrumb'];
        for (let index = 0; index < this.b.length; index++) {
          const element = this.b[index];
          let item : MenuItem = {};
          item.label=element.label;
          item.icon=element.icon;
          if(!this.b.active){
            item.routerLink=element.routerLink;
          }
          breadcrumbItems.push(item);
          this.items=[...breadcrumbItems];
          //console.log(this.items);
        }
      }
    });
  }


}
