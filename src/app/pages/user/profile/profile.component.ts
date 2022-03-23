import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userName:any;
  userEmail:any;
  blogsCount:any;
  constructor(private blog:BlogService,private auth:AuthService) { }

  ngOnInit(): void {
    this.blog.getuserBlog(this.blog.getUserId()).subscribe((res:any)=>{
      this.blogsCount = res.data.length;
    })
    this.auth.getUser().subscribe((res:any)=>{
      this.userName=res.data.fullName;
      this.userEmail=res.data.email;
    })
  }

}
