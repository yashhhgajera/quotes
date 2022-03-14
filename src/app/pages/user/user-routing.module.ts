import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { ProfileComponent } from './profile/profile.component';
import { UserBlogListComponent } from './user-blog-list/user-blog-list.component';
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
        path:'edit/:id',
        loadChildren:()=>import('./create/create.module').then(m=>m.CreateModule)
      },
      {
        path:'list',
        component:UserBlogListComponent
      },
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'blog/:id',
        component:BlogComponent
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
