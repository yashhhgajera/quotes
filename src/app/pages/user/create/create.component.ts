import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  userName:any;

  constructor(private fb: FormBuilder,private blog:BlogService) { }

  ngOnInit(): void {
    this.userName=this.blog.getuserName()
  }

  publish(){
    this.blog.createBlog(this.blogData.value).subscribe(res=>{
      console.log(this.blogData.value)
      this.blogData.reset();
    },err=>{
      console.log(err)
    })
  }

}
