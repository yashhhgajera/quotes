import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  blogId:any;
  blogData:any = '';
  constructor(private route:ActivatedRoute, private blog:BlogService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap)=>{
      this.blogId = params.get('id');
    })
    this.blog.getallBlog().subscribe((res:any)=>{
      this.blogData = res.data.find((b:any)=>{
        return b._id==this.blogId
      })
    })
  }

}
