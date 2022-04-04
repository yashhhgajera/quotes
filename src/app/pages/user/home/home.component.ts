import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  blogList:any;
  constructor(
    private blog:BlogService
  ) { }

  ngOnInit(): void {
    this.showBlog();
  }

  showBlog() {
    this.blog.getallBlog().subscribe((res: any) => {
      this.blogList = res.data;
    })
  }
}
