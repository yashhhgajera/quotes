import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserBlogComponent } from './user-blog/user-blog.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path:'',
    component:UserListComponent
  },
  {
    path:':id',
    component: UserBlogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
