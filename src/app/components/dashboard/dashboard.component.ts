import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  blogList: any = [];
  user: any;
  likeCount: number = 0;
  bsModalRef?: BsModalRef;
  blogURL = 'http://localhost:4200/blog/';

  constructor(private modalService: BsModalService, private blog: BlogService, private router: Router, private auth: AuthService) { }

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

  navigateBlog(id: any) {
    this.router.navigate(['./blog', id]);
  }

  truncate(source: any, size: any) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }

  openModalWithComponent(type: string) {
    type == 'login' ? this.bsModalRef = this.modalService.show(LoginComponent) : this.bsModalRef = this.modalService.show(SignupComponent)
  }

  isLiked(blogId: any) {
    let blogData = this.blogList && this.blogList.find((blog: any) => blog._id == blogId);
    return !!blogData && blogData.likes.indexOf(this.user._id) > -1;
  }

  likeCounter(blogId: any) {
    if (this.auth.userLoggedin()) {
      let id = {
        userId: this.user._id
      }
      this.blog.putLike(blogId, id).subscribe(res => {
        this.showBlog();
        // let blogIndex = this.blogList.indexOf(this.blogList.find((i:any) => {
        //   return i._id === blogId
        // }));
        // this.blogList[blogIndex].likes.push(id);
      }, err => console.log("Error",err));
    } else {
      this.openModalWithComponent('signup');
    }
  }

  navigateUser(id: any) {
    if (this.auth.userLoggedin()) {
      if (id === this.user._id) {
        this.router.navigate(['./user/profile']);
      } else {
        this.router.navigate(['./user/account', id]);
      }
    } else {
      this.openModalWithComponent('signup');
    }
  }
  
}

