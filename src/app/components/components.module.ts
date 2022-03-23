import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { GuestHeaderComponent } from './guest-header/guest-header.component';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthModule } from '../auth/auth.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { ShareButtonsPopupModule } from 'ngx-sharebuttons/popup';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    FooterComponent,
    UserHeaderComponent,
    GuestHeaderComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot(),
    AuthModule,
    ShareButtonsModule.withConfig({
      debug: true,
    }),
    ShareIconsModule,
    ShareButtonsPopupModule,
    MatMenuModule,
    MatIconModule
  ],
  exports: [
    FooterComponent,
    UserHeaderComponent,
    GuestHeaderComponent,
    DashboardComponent
  ]
})
export class ComponentsModule { }
