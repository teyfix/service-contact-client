import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, pluck, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface Breadcrumb {
  last: boolean;
  label: string;
  routerLink: string;
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  private breadcrumbs: Observable<Breadcrumb[]>;

  constructor(private readonly router: Router) {
  }

  ngOnInit() {
    this.breadcrumbs = this.router.events.pipe(
      filter<NavigationEnd>(e => e instanceof NavigationEnd),
      pluck('urlAfterRedirects'),
      startWith(this.router.url),
      map(url => {
        return url.split('/').map((part, i, array) => {
          if (!part) {
            return null;
          }

          return {
            last: i === (array.length - 1),
            label: part[0].toLocaleUpperCase() + part.substring(1),
            routerLink: array.slice(0, i).join('/')
          };
        }).filter(Boolean);
      })
    );
  }
}
