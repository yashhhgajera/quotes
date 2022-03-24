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

  date=new Date();
  blogList:any = [];
  user:any='';
  constructor(private blog:BlogService,private router:Router,private auth:AuthService) { }

  ngOnInit(): void {
    this.showBlog();
  }

  showBlog(){
    this.auth.getUser().subscribe((res:any)=>{
      this.user = res.data
      this.blog.getuserBlog(this.user._id).subscribe(res=>{
        this.blogList=res;
      })
    })
  }

  navigateBlog(id:any){
    this.router.navigate(['./blog',id]);
  }

  deleteBlog(id:any){
    this.blog.deleteBlog(id).subscribe(()=>{
      this.showBlog();
    });
  }
  editBlog(id:any){
    this.router.navigate(['./user/edit',id]);
  }

}
