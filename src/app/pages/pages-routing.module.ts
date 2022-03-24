import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../admin.guard';
import { AuthGuard } from '../auth.guard';
import { BlogComponent } from './blog/blog.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

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
    canActivate:[AdminGuard]
  },
  {
    path:'blog/:id',
    component:BlogComponent
  },
  {
    path:'**',
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
