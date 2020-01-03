import { Component, OnInit } from '@angular/core';

interface MenuItem {
  label: string;
  routerLink: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  title = 'Panel';
  menuItems: MenuItem[] = [
    {label: 'Dealers', routerLink: '/panel/dealers'},
    {label: 'Technical Services', routerLink: '/panel/technical-services'}
  ];

  constructor() {
  }

  ngOnInit() {
  }
}
