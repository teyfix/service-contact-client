import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ReplaySubject } from 'rxjs';
import { User } from 'src/app/service/auth/entity/user';

interface MenuItem {
  label: string;
  routerLink: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: ReplaySubject<User>;
  title = 'Panel';
  menuItems: MenuItem[] = [
    {label: 'Dealers', routerLink: '/panel/dealers'},
    {label: 'Technical Services', routerLink: '/panel/technical-services'},
  ];

  constructor(private readonly authService: AuthService) {
  }

  ngOnInit() {
    this.user = this.authService.user;
  }
}
