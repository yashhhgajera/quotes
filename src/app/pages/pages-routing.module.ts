import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path:'',
    loadChildren: ()=>import('./guest/guest.module').then(m=>m.GuestModule)
  },
  {
    path:'user',
    loadChildren: ()=>import('./user/user.module').then(m=>m.UserModule),
    canActivate:[AuthGuard]
  },
  {
    path:'admin',
    loadChildren: ()=>import('./admin/admin.module').then(m=>m.AdminModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
