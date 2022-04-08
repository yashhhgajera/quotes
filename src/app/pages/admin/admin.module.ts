import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { BlogsComponent } from './blogs/blogs.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AdminComponent,
    BlogsComponent,
    AdminDashboardComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    ComponentsModule
  ]
})
export class AdminModule { }
