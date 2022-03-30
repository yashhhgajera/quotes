import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-user-blog',
  templateUrl: './user-blog.component.html',
  styleUrls: ['./user-blog.component.scss']
})
export class UserBlogComponent implements OnInit {


  blogList: any = [];
  user: any;
  likeCount: number = 0;
  modalRef?: BsModalRef;
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

  navigateUser(id: any) {
    if (this.auth.userLoggedin()) {
      if (id === this.user._id) {
        this.router.navigate(['./user/profile']);
      } else {
        this.router.navigate(['./user/account', id]);
      }
     } //else {
  //     this.openModalWithComponent('signup');
  //   }
  // }
  }
  
  deleteBlog(blogId: any){
    this.modalRef?.hide();
    this.blog.deleteBlog(blogId).subscribe(() => { 
      let blogIndex = this.blogList.findIndex((i:any) => i._id === blogId);
      this.blogList.splice(blogIndex, 1);
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.modalRef?.hide();
  }



}
