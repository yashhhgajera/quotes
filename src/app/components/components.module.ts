import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { GuestHeaderComponent } from './guest-header/guest-header.component';



@NgModule({
  declarations: [
    FooterComponent,
    UserHeaderComponent,
    GuestHeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FooterComponent,
    UserHeaderComponent,
    GuestHeaderComponent
  ]
})
export class ComponentsModule { }
