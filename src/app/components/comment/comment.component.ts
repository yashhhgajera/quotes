import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BlogService } from 'src/app/services/blog.service';
import { AuthService } from 'src/app/services/auth.service';
import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { AlertService } from 'src/app/services/alert.service';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  date = new Date();
  userId: any;
  @Input() blogId: any;
  modalRef?: BsModalRef;
  comments: any;
  accounts:any;

  commentData = this.fb.group({
    "text": ['', [Validators.required]]
  });

  isValid = true;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private blog: BlogService,
    private modalService: BsModalService,
    private alert:AlertService,
    private account:AccountsService
  ) { }

  ngOnInit(): void {
    this.blog.getAllComment(this.blogId).subscribe((res: any) => {
      this.comments = res.data.comments
    });

    this.auth.getUser().subscribe((res: any) => {
      this.userId = res.data._id;
    })
    this.account.getAccounts().subscribe((res:any)=>{
      this.accounts = res.data;
    })
  }

  openModal(template: TemplateRef<any>) {
    this.isValid = true;
    this.modalRef = this.modalService.show(template);
  }
  dateDiff(blogDate: Date) {
    let d = new Date(blogDate);
    let calDate = Math.abs(this.date.getDate() - d.getDate());
    return calDate == 0 ? ((this.date.getHours() - d.getHours()) == 0 ? (this.date.getMinutes() - d.getMinutes()) <= 0 ? 'recently' : (this.date.getMinutes() - d.getMinutes()) + "m ago" : (this.date.getHours() - d.getHours()) + "h ago") : calDate + "d ago";
  }
  openModalWithComponent(type: string) {
    type == 'signup' ? this.modalRef = this.modalService.show(SignupComponent) : this.modalRef = this.modalService.show(CommentComponent);
  }

  addComment() {
    if (this.auth.userLoggedin()) {
      if (this.commentData.valid) {
        this.isValid = true;
        let data = {
          "userId": this.userId,
          "text": this.commentData.value.text
        }
        this.blog.postComment(this.blogId, data).subscribe((res: any) => {
          this.commentData.reset();
          this.comments.push(res.data);
        }, (err) => {
          console.log(err);
        });
      } else {
        this.isValid = false;
      }
    } else {
      this.modalRef?.hide();
      this.openModalWithComponent('signup');
    }
  }

  deleteComment(id:any,index:Number){
    this.blog.deleteComment(id).subscribe((res:any)=>{
      this.comments.splice(index, 1);
      this.alert.success(res.message);
    },err=>{
      this.alert.error(err.statusText);
    })
  }

  getName(id:any){
    let acc = this.accounts.find((a:any)=>a._id==id);
    return acc.fullName
  }

  getProfilePic(id:any){
    let acc = this.accounts.find((a:any)=>a._id==id);
    return acc.profilePicUrl
  }

}




