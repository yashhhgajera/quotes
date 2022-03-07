import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path:'',
    component:UserComponent,
    children:[
      {
        path:'home',
        loadChildren:()=>import('./home/home.module').then(m=>m.HomeModule)
      },
      {
        path:'create',
        loadChildren:()=>import('./create/create.module').then(m=>m.CreateModule)
      },
      {
        path:'',
        redirectTo:'home'
      }
    ], 
  },

  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
