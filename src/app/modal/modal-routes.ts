import { Routes } from '@angular/router';
import { CreateDealerComponent } from 'src/app/modal/create-dealer/create-dealer.component';

export const routes: Routes = [
  {
    path: 'panel',
    children: [
      {
        path: 'dealers',
        children: [
          {path: 'create', data: {previous: 'panel/dealers'}, component: CreateDealerComponent},
        ],
      },
    ],
  },
];
