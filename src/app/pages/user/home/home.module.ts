import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { BlogService } from 'src/app/services/blog.service';

@NgModule({
  declarations: [
    HomeComponent,
    HomeDashboardComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,

  ],
  providers:[BlogService],
  exports:[HomeDashboardComponent]
})
export class HomeModule { }
