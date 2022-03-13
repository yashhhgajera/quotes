import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-user-blog-list',
  templateUrl: './user-blog-list.component.html',
  styleUrls: ['./user-blog-list.component.scss']
})
export class UserBlogListComponent implements OnInit {

  blogList:any = [];
  constructor(private blog:BlogService,private router:Router) { }

  ngOnInit(): void {
    this.blog.getuserBlog(this.blog.getUserId()).subscribe(res=>{
      this.blogList=res;
    })
  }

  navigateBlog(id:any){
    this.router.navigate(['./user/blog',id]);
  }

}
