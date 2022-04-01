import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {


  @Input() blogList: any = [];
  user: any;
  likeCount: number = 0;
  modalRef?: BsModalRef;
  @Input() admin = false;

  constructor(
    private modalService: BsModalService, 
    private blog: BlogService, 
    private router: Router, 
    private auth: AuthService,
    public alert:AlertService) { }

  ngOnInit(): void {
    this.auth.getUser().subscribe((res: any) => {
      this.user = res.data;
    });
    // this.showBlog();
  }

  // showBlog() {
  //   this.blog.getallBlog().subscribe((res: any) => {
  //     this.blogList = res.data;
  //   })
  // }

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
    this.blog.deleteBlog(blogId).subscribe((res:any) => { 
      let blogIndex = this.blogList.findIndex((i:any) => i._id === blogId);
      this.blogList.splice(blogIndex, 1);
      this.alert.success(res.message)
    },err=>{
      this.alert.error(err.statusText);
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.modalRef?.hide();
  }

  editBlog(id:any){
    this.router.navigate(['./user/edit',id]);
  }

}
