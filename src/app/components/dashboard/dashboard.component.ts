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

  blogList:any = [];
  userName: any;
  likeCount: number = 0;
  bsModalRef?: BsModalRef;
  modalRef?: BsModalRef;

  constructor(private modalService: BsModalService,private blog:BlogService,private router:Router,private auth:AuthService) { }

  ngOnInit(): void {
    this.userName = this.blog.getuserName();
    this.showBlog();
  }

  showBlog(){
    this.blog.getallBlog().subscribe((res:any)=>{
      this.blogList=res;
    })
  }

  navigateBlog(id:any){
      this.router.navigate(['./blog',id]);
  }
  
  truncate(source: any, size: any) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }

  openModalWithComponent(type: string) {
    type == 'login' ? this.bsModalRef = this.modalService.show(LoginComponent) : this.bsModalRef = this.modalService.show(SignupComponent)
  }

  likeCounter(blogId: any){
    if(this.auth.userLoggedin()){
      let id = {
        userId: this.blog.getUserId()
      }
      this.blog.putLike(blogId, id).subscribe(res => {
        this.showBlog();
      }, err => console.log("Error"));
    }else{
      this.openModalWithComponent('signup');
    }

  }

}

