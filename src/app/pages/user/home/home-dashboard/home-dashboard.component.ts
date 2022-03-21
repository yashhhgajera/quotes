import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss']
})
export class HomeDashboardComponent implements OnInit {

  blogList:any = [];
  userName: any;
  likeCount: number = 0;
  constructor(private blog:BlogService,private router:Router) { }

  ngOnInit(): void {
    this.userName = this.blog.getuserName();
    this.showBlog();
  }

  showBlog(){
    this.blog.getallBlog().subscribe((res:any)=>{
      this.blogList=res;
    })
  }

  navigateBlog(id:any){
    this.router.navigate(['./user/blog',id]);
  }
  
  truncate(source: any, size: any) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }

  likeCounter(blogId: any){
    let id = {
      userId: this.blog.getUserId()
    }
    this.blog.putLike(blogId, id).subscribe(res => {
      this.showBlog();
    }, err => console.log("Error"));

  }

}
