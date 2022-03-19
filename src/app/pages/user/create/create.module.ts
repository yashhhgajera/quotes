import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogService } from 'src/app/services/blog.service';
import { AuthService } from 'src/app/services/auth.service';
import { RichTextEditorModule, ToolbarService, LinkService, ImageService, HtmlEditorService, TableService } from '@syncfusion/ej2-angular-richtexteditor';


@NgModule({
  declarations: [
    CreateComponent
  ],
  imports: [
    CommonModule,
    CreateRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RichTextEditorModule
  ],
  providers:[BlogService,AuthService,ToolbarService, LinkService, ImageService, HtmlEditorService, TableService]
})
export class CreateModule { }
