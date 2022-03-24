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
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountsService } from 'src/app/services/accounts.service';

@NgModule({
  declarations: [
    UserComponent,
    UserBlogListComponent,
    ProfileComponent,
    AccountsComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ComponentsModule,
    AlertModule.forRoot(),
    MatMenuModule,
    MatIconModule
  ],
  providers:[AuthService,BlogService,AccountsService]
})
export class UserModule { }
