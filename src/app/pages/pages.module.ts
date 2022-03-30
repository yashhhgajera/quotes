import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { BlogComponent } from './blog/blog.component';
import { ComponentsModule } from '../components/components.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    BlogComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ComponentsModule,
    ShareButtonsModule.withConfig({
      debug: true,
    }),
    MatMenuModule,
  ]
})
export class PagesModule { }
