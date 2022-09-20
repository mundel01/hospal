import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APP_URL } from '@config/constant';
import { AuthGuard } from './auth/auth.guard';
import { routes } from './routes';

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
