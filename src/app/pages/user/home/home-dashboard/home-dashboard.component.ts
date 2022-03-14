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
  constructor(private blog:BlogService,private router:Router) { }

  ngOnInit(): void {
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

}
