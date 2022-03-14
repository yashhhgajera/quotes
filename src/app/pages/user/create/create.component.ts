import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  blogData = this.fb.group({
    "userId":[this.blog.getUserId()],
    "blogTitle": [''],
    "blogDescription": [''],
  });
  blogId:any;
  userName:any;

  constructor(private fb: FormBuilder,private blog:BlogService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.userName=this.blog.getuserName();
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
    this.blog.createBlog(this.blogData.value).subscribe(res=>{
      this.resetBlog();
    },err=>{
      console.log(err)
    })
  }

  update(){
    this.blog.updateBlog(this.blogData.value,this.blogId).subscribe(res=>{
      this.resetBlog();
      this.router.navigate(['./user/list']);
    },err=>{
      console.log(err)
    })
  }

}
