import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SingUpComponent } from './components/sing-up/sing-up.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SingUpComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'sing-up',
    component: SingUpComponent,
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
