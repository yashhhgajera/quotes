import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  user: any = '';
  blogId: any;
  blogList: any;
  bsModalRef?: BsModalRef;

  constructor(private route: ActivatedRoute,
              private blog: BlogService, 
              private auth: AuthService, 
              private router: Router, 
              private modalService: BsModalService,
              private metaTag: Meta,
              private titleTag: Title 
              ) { }

  ngOnInit(): void {

    if (this.auth.userLoggedin()) {
      this.auth.getUser().subscribe((res: any) => {
        this.user = res.data;
      });
    }
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.blogId = params.get('id');
    })
    this.blog.getallBlog().subscribe((res: any) => {
      this.blogList = res.data.filter((b: any) => {
        return b._id == this.blogId;
      });

      this.titleTag.setTitle(this.blogList[0].blogTitle);
      this.metaTag.addTags([
          { name: 'description', content: this.blogList[0].blogDescription },
          { name: 'keywords', content: 'blog | quotes | ideas | ' + this.blogList[0].blogTitle },
          { name: 'robots', content: 'index, follow' },
          { name: 'title', content: this.blogList[0].blogTitle + "| by " + this.blogList[0].userId.fullName + "| Quotes" },
          { property: 'og:title', content: this.blogList[0].blogTitle },
          { property: 'og:type', content: 'article' },
          { property: 'og:site_name', content: 'Quotes' },
          { name: 'author', content: this.blogList[0].userId.fullName },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { property: "article:published_time", content: this.blogList[0].createdAt },
          { charset: 'UTF-8' },
          // { property: 'og:url', content:'https://www.quotes.in/'+ this.blogList[0].blogTitle},
          // { name: 'url', content:'https://www.quotes.in/'+ this.blogList[0].blogTitle},
      ]);
    })

    
  }

  openModalWithComponent(type: string) {
    type == 'login' ? this.bsModalRef = this.modalService.show(LoginComponent) : this.bsModalRef = this.modalService.show(SignupComponent)
  }

  navigateUser(id: any) {
    if (this.auth.userLoggedin()) {
      this.auth.getUser().subscribe((res: any) => {
        this.user = res.data;
        if (id === this.user._id) {
          this.router.navigate(['./user/profile']);
        } else {
          this.router.navigate(['./user/account', id]);
        }
      });
    } else {
      this.openModalWithComponent('signup');
    }
  }

}
