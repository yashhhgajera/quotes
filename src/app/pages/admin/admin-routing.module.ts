import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { BlogsComponent } from './blogs/blogs.component';
import { UserBlogComponent } from './users/user-blog/user-blog.component';

const routes: Routes = [
  {
    path:'',
    component:AdminComponent,
    children:[
      {
        path:'users',
        loadChildren: ()=>import('./users/users.module').then(m=>m.UsersModule)
      },
      {
        path:'blogs',
        component:BlogsComponent
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
