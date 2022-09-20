import { AllRoles } from './../types/role.enum';
import { RoleGuard } from './guards/role.guard';
import { Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { APP_URL } from '@config/constant';
import { Role } from '@custom-types/role.enum';
import { AppComponent } from './app.component';

export const routes: Routes = [
  // { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  {
    path: APP_URL.AUTH,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  { 
    path: '', 
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule),
    canActivate: [AuthGuard], 
  },


  // {
  //   path: APP_URL.MASTERS_CITY,
  //   loadChildren: () =>
  //     import('./masters/city/city.module').then((m) => m.CityModule),
  //   canActivate: [AuthGuard, RoleGuard],
  //   data: { roles: [Role.ADMIN] },
  // },
];