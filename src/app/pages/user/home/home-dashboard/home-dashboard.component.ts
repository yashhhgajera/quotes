import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss']
})
export class HomeDashboardComponent implements OnInit {

  blogList:any = [];
  constructor(private blog:BlogService) { }

  ngOnInit(): void {
    this.blog.getallBlog().subscribe((res:any)=>{
      this.blogList=res;
    })
  }

}
