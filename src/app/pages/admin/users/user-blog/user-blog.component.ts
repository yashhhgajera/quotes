import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
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


  blogList: any;
  user: any;
  accountData: any;
  accId:any;
  modalRef?: BsModalRef;

  constructor(
    private blog: BlogService,
    private auth: AuthService,
    private modalService: BsModalService,
    private account: AccountsService,
    private route: ActivatedRoute,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.showBlog();
  }

  showBlog() {
    this.auth.getUser().subscribe((res: any) => {
      this.user = res.data;
    });
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.accId = params.get('id');
    })
    this.account.getAccounts().subscribe((res: any) => {
      this.accountData = res.data.find((u: any) => {
        return u._id == this.accId
      });
    });
    this.blog.getuserBlog(this.accId).subscribe((res: any) => {
      this.blogList = res.data;
    })
  }

  deleteBlogs(userId:any) {
    this.blog.deleteBlogByUserId(userId).subscribe((res: any) => {
      this.blogList = [];
      this.alert.success(res.message)
    }, err => {
      this.alert.error(err.statusText);
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  decline(): void {
    this.modalRef?.hide();
  }
}
