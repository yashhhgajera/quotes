import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { GuestHeaderComponent } from './guest-header/guest-header.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
@NgModule({
  declarations: [
    FooterComponent,
    UserHeaderComponent,
    GuestHeaderComponent,
    
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatMenuModule
  ],
  exports: [
    FooterComponent,
    UserHeaderComponent,
    GuestHeaderComponent
  ]
})
export class ComponentsModule { }
