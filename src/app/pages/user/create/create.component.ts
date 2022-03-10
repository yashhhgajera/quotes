import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  blogData = this.fb.group({
    "blogTitle": [''],
    "blogDescription": [''],
    "createdAt":[Date.now()]
  });

  constructor(private fb: FormBuilder,private blog:BlogService) { }

  ngOnInit(): void {
  }

  publish(){
    this.blog.createBlog(this.blogData.value).subscribe(res=>{
      this.blogData.reset();
    },err=>{
      console.log(err)
    })
  }

}
