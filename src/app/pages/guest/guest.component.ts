import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit {

  blogList: any;

  constructor(
    private blog: BlogService) { }

  ngOnInit(): void {
    this.showBlog();

  }

  showBlog() {
    this.blog.getallBlog().subscribe((res: any) => {
      this.blogList = res.data;
    })
  }

}
