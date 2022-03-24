import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user:any='';
  blogsCount:any;
  constructor(private blog:BlogService,private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.getUser().subscribe((res:any)=>{
      this.user=res.data;
      this.blog.getuserBlog(this.user._id).subscribe((res:any)=>{
        this.blogsCount = res.data.length;
      })
    })
  }

}
