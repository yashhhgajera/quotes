import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { BlogService } from 'src/app/services/blog.service';
import { AuthModule } from 'src/app/auth/auth.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AuthModule,
    ComponentsModule
  ],
  providers:[BlogService],
  exports:[]
})
export class HomeModule { }
