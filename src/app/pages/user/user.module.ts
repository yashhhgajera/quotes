import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { UserBlogListComponent } from './user-blog-list/user-blog-list.component';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';
import { ProfileComponent } from './profile/profile.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BlogComponent } from './blog/blog.component';


@NgModule({
  declarations: [
    UserComponent,
    UserBlogListComponent,
    ProfileComponent,
    BlogComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ComponentsModule,
    AlertModule.forRoot()
  ],
  providers:[AuthService,BlogService]
})
export class UserModule { }
