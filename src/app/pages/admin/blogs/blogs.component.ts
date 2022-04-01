import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {


  blogList: any = [];
  user: any;

  constructor(
    private blog: BlogService, 
    private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getUser().subscribe((res: any) => {
      this.user = res.data;
    });
    this.showBlog();
  }

  showBlog() {
    this.blog.getallBlog().subscribe((res: any) => {
      this.blogList = res.data;
    })
  }

}
