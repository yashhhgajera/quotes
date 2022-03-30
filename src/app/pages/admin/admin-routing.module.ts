import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UserBlogComponent } from './user-blog/user-blog.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path:'',
    component:AdminComponent,
    children:[
      {
        path:'users',
        component:UserListComponent
      },
      {
        path:'blogs',
        component:UserBlogComponent
      },
      {
        path:'',
        redirectTo:'users',
        pathMatch:'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
