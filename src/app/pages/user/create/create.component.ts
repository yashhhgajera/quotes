import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RichTextEditorComponent, FormatModel, FontFamilyModel } from '@syncfusion/ej2-angular-richtexteditor';
import { BlogService } from 'src/app/services/blog.service';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  user: any = '';
  blogData = this.fb.group({
    "userId": [''],
    "blogTitle": ['', Validators.required],
    "blogDescription": ['', Validators.required],
    "image": ['', [Validators.required]]
  });
  isValid = true;
  selectedFile: File | any;
  blogId: any;

  constructor(
    private fb: FormBuilder, 
    private blog: BlogService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private auth: AuthService,
    public alert:AlertService) { }

  ngOnInit(): void {
    this.auth.getUser().subscribe((res: any) => {
      this.user = res.data;
      this.blogData.patchValue({
        "userId": [this.user._id]
      });
      this.route.paramMap.subscribe((params: ParamMap) => this.blogId = params.get('id'));
      this.blog.getuserBlog(this.user._id).subscribe((res: any) => {
        let editBlog = res.data.find((b: any) => b._id == this.blogId);
        if (editBlog) {
          this.blogData.patchValue({
            "blogTitle": [editBlog.blogTitle],
            "blogDescription": [editBlog.blogDescription],
          });
        }
      })
    })
  }

  resetBlog() {
    this.blogData.patchValue({
      "blogTitle": [''],
      "blogDescription": [''],
      "image": ['']
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  publish() {
    if (this.blogData.valid) {
      this.isValid = true;
      const bData = new FormData();
      bData.append('image', this.selectedFile, this.selectedFile?.name),
      bData.set('blogTitle', String(this.blogData.value.blogTitle));
      bData.set('blogDescription', String(this.blogData.value.blogDescription));
      bData.set('userId', String(this.blogData.value.userId));
      this.blog.createBlog(bData).subscribe((res:any) => {
        this.resetBlog();
        this.router.navigate(['./user/list']);
        this.alert.success(res.message);
      },err=>{
        this.alert.error(err.statusText);
      })
    } else {
      this.isValid = false;
    }
  }

  update() {
    if (this.blogData.valid) {
      this.isValid = true;
      let updatedData = new FormData();
      updatedData.append('image', this.selectedFile, this.selectedFile?.name),
      updatedData.set('blogTitle', String(this.blogData.value.blogTitle));
      updatedData.set('blogDescription', String(this.blogData.value.blogDescription));
      this.blog.updateBlog(updatedData, this.blogId).subscribe((res:any) => {
        this.resetBlog();
        this.router.navigate(['./user/list']);
        this.alert.success(res.message)
      },err=>{
        this.alert.error(err.statusText);
      })
    } else {
      this.isValid = false;
    }
  }

  @ViewChild('select')
  public rteSelectObj: CheckBoxComponent | any;

  @ViewChild('inlineRTE')
  public rteObj: RichTextEditorComponent | any;

  public toolbarSettings: ToolbarModule = {
    items: ['Bold', 'Italic', 'Underline',
      'Formats', 'Alignments', '-', 'OrderedList', 'UnorderedList',
      'CreateLink']
  };
  public format: FormatModel = {
    width: 'auto'
  };
  public fontFamily: FontFamilyModel = {
    width: 'auto'
  };
  public inlineMode: object = { enable: true, onSelection: false };

}
