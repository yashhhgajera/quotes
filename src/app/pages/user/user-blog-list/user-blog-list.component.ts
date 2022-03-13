import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-user-blog-list',
  templateUrl: './user-blog-list.component.html',
  styleUrls: ['./user-blog-list.component.scss']
})
export class UserBlogListComponent implements OnInit {

  blogList:any = [];
  constructor(private blog:BlogService) { }

  ngOnInit(): void {
    this.blog.getuserBlog(this.blog.getUserId()).subscribe(res=>{
      this.blogList=res;
    })
  }

}
