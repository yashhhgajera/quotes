import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
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
  constructor(
    private blog:BlogService,
    private router:Router,
    private auth:AuthService,
    public alert:AlertService) { }

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
    this.blog.deleteBlog(id).subscribe((res:any)=>{
      let blogIndex = this.blogList.data.findIndex((i:any) => i._id === id);
      this.blogList.data.splice(blogIndex, 1);
      this.alert.success(res.message);
    },err=>{
      this.alert.error(err.statusText);
    });
  }

  editBlog(id:any){
    this.router.navigate(['./user/edit',id]);
  }

}
