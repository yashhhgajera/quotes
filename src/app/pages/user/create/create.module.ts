import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogService } from 'src/app/services/blog.service';
import { AuthService } from 'src/app/services/auth.service';


@NgModule({
  declarations: [
    CreateComponent
  ],
  imports: [
    CommonModule,
    CreateRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers:[BlogService,AuthService]
})
export class CreateModule { }
