import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccountsService } from 'src/app/services/accounts.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-user-blog',
  templateUrl: './user-blog.component.html',
  styleUrls: ['./user-blog.component.scss']
})
export class UserBlogComponent implements OnInit {


  blogList: any | null;
  user: any;
  likeCount: number = 0;
  modalRef?: BsModalRef;
  accountData:any;
  blogURL = 'http://localhost:4200/blog/';

  constructor(
    private modalService: BsModalService, 
    private blog: BlogService, 
    private router: Router, 
    private auth: AuthService, 
    private account : AccountsService,
    private route:ActivatedRoute,
    public alert:AlertService) { }

  ngOnInit(): void {
    this.showBlog();
  }
  
  showBlog() {
    this.auth.getUser().subscribe((res: any) => {
      this.user = res.data;
    });
    let accId: any;
    this.route.paramMap.subscribe((params: ParamMap) => {
      accId = params.get('id');
    })
    this.account.getAccounts().subscribe((res: any) => {
      this.accountData = res.data.find((u: any) => {
        return u._id == accId
      });
    });
    this.blog.getuserBlog(accId).subscribe((res: any) => {
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
}
