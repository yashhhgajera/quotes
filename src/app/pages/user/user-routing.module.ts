import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren:()=>import('./home/home.module').then(m=>m.HomeModule)
  },
  {
    path:'create',
    loadChildren:()=>import('./create/create.module').then(m=>m.CreateModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
