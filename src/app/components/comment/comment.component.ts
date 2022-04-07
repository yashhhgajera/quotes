import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BlogService } from 'src/app/services/blog.service';
import { AuthService } from 'src/app/services/auth.service';
import { SignupComponent } from 'src/app/auth/signup/signup.component';

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

  commentData = this.fb.group({
    "text": ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private blog: BlogService, 
    private modalService: BsModalService
    ) { }

  ngOnInit(): void {
    this.blog.getAllComment(this.blogId).subscribe((res: any) => {
      this.comments = res.data.comments
    });

    this.auth.getUser().subscribe((res: any) => {
      this.userId = res.data._id;
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  dateDiff(blogDate: Date) {
    let d = new Date(blogDate);
    let calDate = this.date.getDate() - d.getDate();
    return calDate == 0 ? ((this.date.getHours() - d.getHours()) == 0 ? (this.date.getMinutes() - d.getMinutes()) == 0 ? 'recently' : (this.date.getMinutes() - d.getMinutes()) + "m ago" : this.date.getHours() - d.getHours() + "h ago") : calDate + "d ago";
  }
  openModalWithComponent(type: string) {
    type == 'signup' ? this.modalRef = this.modalService.show(SignupComponent) : this.modalRef = this.modalService.show(CommentComponent);
  }

  addComment() {
    if (this.auth.userLoggedin()) {
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
  }else {
    this.modalRef?.hide();
    this.openModalWithComponent('signup');
  }
  }


}
