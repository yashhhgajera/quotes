import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  date = new Date();
  @Input() blogId: any;
  modalRef?: BsModalRef;
  @Input() cmtLen = 0;
  comments: any = { "date" : Date};
  commentData = this.fb.group({
    "text": ['', [Validators.required]]
  })
  constructor(private fb: FormBuilder, private blog: BlogService ,private modalService: BsModalService) { }

  ngOnInit(): void {
    this.blog.getAllComment(this.blogId).subscribe((res:any) =>{
      this.comments = res.data.comments
    } );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  dateDiff(blogDate: Date){
    let d = new Date(blogDate);
    let calDate = d.getDate() - this.date.getDate();
    return calDate == 0 ? (this.date.getHours() - d.getHours()) + "h ago" : calDate + "d ago" 
  }
  

}
