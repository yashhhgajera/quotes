import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-like-share-button',
  templateUrl: './like-share-button.component.html',
  styleUrls: ['./like-share-button.component.scss']
})
export class LikeShareButtonComponent implements OnInit {

  @Input() blogList: any;
  @Input() user: any;
  @Input() blogId: any;
  @Input() likeLen: any;
  bsModalRef?: BsModalRef;
  blogURL = 'http://localhost:4200/blog/';

  constructor(
    private modalService: BsModalService,
    private auth: AuthService,
    private blog: BlogService) { }

  ngOnInit(): void {
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
        this.toggleLike(blogId, id.userId);
      }, err => console.log("Error", err));
    } else {
      this.openModalWithComponent('signup');
    }
  }

  toggleLike(blogId: string, userId: string) {
    let blogIndex = this.blogList.findIndex((i: any) => i._id === blogId);
    if (this.blogList[blogIndex].likes.indexOf(userId) > -1) {
      let userIndex = this.blogList[blogIndex].likes.findIndex((i: any) => i === userId);
      this.blogList[blogIndex].likes.splice(userIndex, 1);
    } else {
      this.blogList[blogIndex].likes.push(userId);
    }
  }

}
