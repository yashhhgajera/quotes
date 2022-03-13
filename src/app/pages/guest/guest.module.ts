import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestRoutingModule } from './guest-routing.module';
import { GuestComponent } from './guest.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { HomeModule } from '../user/home/home.module';

@NgModule({
  declarations: [
    GuestComponent
  ],
  imports: [
    CommonModule,
    GuestRoutingModule,
    ComponentsModule,
    HomeModule
  ]
})
export class GuestModule { }
