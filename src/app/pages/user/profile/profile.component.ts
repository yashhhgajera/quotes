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
      this.blogsCount = res.data.length;
    })
    this.userName=this.blog.getuserName();
  }

}
