import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserBlogComponent } from './user-blog/user-blog.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    UserListComponent,
    UserBlogComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ComponentsModule
  ]
})
export class UsersModule { }
