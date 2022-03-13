import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userName:any;
  blogsCount:any;
  constructor(private blog:BlogService) { }

  ngOnInit(): void {
    this.blog.getuserBlog(this.blog.getUserId()).subscribe((res:any)=>{
      this.userName = res.data[0].userId.fullName;
      this.blogsCount = res.data.length;
    })
  }

}
