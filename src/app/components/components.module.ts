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
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BlogListComponent } from './blog-list/blog-list.component';
import { LikeShareButtonComponent } from './like-share-button/like-share-button.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { CommentComponent } from './comment/comment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [
    FooterComponent,
    UserHeaderComponent,
    GuestHeaderComponent,
    DashboardComponent,
    CarouselComponent,
    BlogListComponent,
    LikeShareButtonComponent,
    BackButtonComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AuthModule,
    ShareButtonsModule.withConfig({
      debug: true,
    }),
    ShareIconsModule,
    ShareButtonsPopupModule,
    MatMenuModule,
    MatIconModule,
    CarouselModule.forRoot(),
    ReactiveFormsModule
  ],
  exports: [
    BackButtonComponent,
    FooterComponent,
    UserHeaderComponent,
    GuestHeaderComponent,
    DashboardComponent,
    CarouselComponent,
    LikeShareButtonComponent,
    BlogListComponent
  ]
})
export class ComponentsModule { }
