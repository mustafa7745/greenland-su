import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/read/read.component';
import { AdsComponent } from './ads/read/read.component';
import { OffersComponent } from './offers/read/read.component';
import { NotificationsComponent } from './notifications/read/read.component';
import { UsersComponent } from './delivery_men/read.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: DashboardComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'permissions', component: CategoriesComponent },
      { path: 'ads', component: AdsComponent },
      { path: 'offers', component: OffersComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'users', component: UsersComponent },




    
    ],
  },
];
