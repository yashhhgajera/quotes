import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { GuestHeaderComponent } from './guest-header/guest-header.component';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthModule } from '../auth/auth.module';
@NgModule({
  declarations: [
    FooterComponent,
    UserHeaderComponent,
    GuestHeaderComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot(),
    AuthModule
  ],
  exports: [
    FooterComponent,
    UserHeaderComponent,
    GuestHeaderComponent
  ]
})
export class ComponentsModule { }
