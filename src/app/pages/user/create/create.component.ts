import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RichTextEditorComponent,FormatModel, FontFamilyModel } from '@syncfusion/ej2-angular-richtexteditor';
import { BlogService } from 'src/app/services/blog.service';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  user:any = '';
  blogData = this.fb.group({
    "userId":[''],
    "blogTitle": ['',Validators.required],
    "blogDescription": ['',Validators.required],
  });
  isValid=true;
  blogId:any;

  constructor(private fb: FormBuilder,private blog:BlogService,private route:ActivatedRoute,private router:Router,private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.getUser().subscribe((res:any)=>{
      this.user = res.data;
      this.blogData.patchValue({
        "userId": [this.user._id]
      });
    })
    this.route.paramMap.subscribe((params:ParamMap)=>{
      this.blogId = params.get('id');
    })
    this.blog.getallBlog().subscribe((res:any)=>{
      let editBlog = res.data.find((b:any)=>{
        return b._id==this.blogId
      });
      if(editBlog){
        this.blogData.patchValue({
          "blogTitle": [editBlog.blogTitle],
          "blogDescription": [editBlog.blogDescription]
        });
      }
    })
  }

  resetBlog(){
    this.blogData.patchValue({
      "blogTitle": [''],
      "blogDescription": ['']
    });
  }

  publish(){
    if(this.blogData.valid){
      this.isValid=true;
      this.blog.createBlog(this.blogData.value).subscribe(res=>{
        this.resetBlog();
      },err=>{
        console.log(err)
      })
    }else{
      this.isValid=false;
    }
  }

  update(){
    if(this.blogData.valid){
      this.isValid=true;
      this.blog.updateBlog(this.blogData.value,this.blogId).subscribe(res=>{
        this.resetBlog();
        this.router.navigate(['./user/list']);
      },err=>{
        console.log(err)
      })
    }else{
      this.isValid=false;
    }
  }

  @ViewChild('select')
  public rteSelectObj: CheckBoxComponent | any;

  @ViewChild('inlineRTE')
  public rteObj: RichTextEditorComponent | any;

  public toolbarSettings: ToolbarModule = {
      items: ['Bold', 'Italic', 'Underline',
          'Formats', 'Alignments', '-', 'OrderedList', 'UnorderedList',
          'CreateLink','Image']
  };
  public format: FormatModel = {
      width: 'auto'
  };
  public fontFamily: FontFamilyModel = {
      width: 'auto'
  };
  public inlineMode: object = { enable: true, onSelection: false };

}
