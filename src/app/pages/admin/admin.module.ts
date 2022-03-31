import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { BlogsComponent } from './blogs/blogs.component';


@NgModule({
  declarations: [
    AdminComponent,
    BlogsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class AdminModule { }
