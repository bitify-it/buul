import {trigger, state, style, animate, transition} from '@angular/animations';
import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)'})),
      state('rotated', style({ transform: 'rotate(-180deg)'})),
      transition('rotated => default', animate('1500ms ease-out')),
      transition('default => rotated', animate('400ms ease-in'))
  ])
]
})
export class NavbarComponent implements OnInit {

  @Output("toggleSideBar") toggleSideBar: EventEmitter<any> = new EventEmitter();
  @Output("toggleSideBarMobile") toggleSideBarMobile: EventEmitter<any> = new EventEmitter();
  @Output("closeSideBarMobile") closeSideBarMobile: EventEmitter<any> = new EventEmitter();
  state: string = 'default';

  constructor(private el: ElementRef,private router: Router) { 
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        this.closeSideBarFronNavbarMobile();
      }
    });
  }

  ngOnInit() {
    //this.productService.getProductsSmall().then(products => this.products = products);
  }    

  toggleSideBarFronNavbar(){
    this.toggleSideBar.emit();
    this.toggleSideBarIcon();
  }
  toggleSideBarFronNavbarMobile(){
    window.scrollTo(0, 0);
    this.toggleSideBarMobile.emit();
  }
  closeSideBarFronNavbarMobile(){
    this.closeSideBarMobile.emit();
  }

  toggleSideBarIcon(){
    this.state = (this.state === 'default' ? 'rotated' : 'default');
  }

}
