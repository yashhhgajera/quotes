import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  user:any='';
  blogId:any;
  blogData:any = '';
  bsModalRef?: BsModalRef;

  constructor(private route:ActivatedRoute, private blog:BlogService,private auth:AuthService,private router:Router,private modalService:BsModalService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap)=>{
      this.blogId = params.get('id');
    })
    this.blog.getallBlog().subscribe((res:any)=>{
      this.blogData = res.data.filter((b:any)=>{
        return b._id==this.blogId
      });
    })
  }

  previousPage(): void {
    history.back();
  }

  openModalWithComponent(type: string) {
    type == 'login' ? this.bsModalRef = this.modalService.show(LoginComponent) : this.bsModalRef = this.modalService.show(SignupComponent)
  }

  navigateUser(id:any){
    if(this.auth.userLoggedin()){
      this.auth.getUser().subscribe((res:any)=>{
        this.user=res.data;
        if(id===this.user._id){
          this.router.navigate(['./user/profile']);
        }else{
          this.router.navigate(['./user/account',id]);
        }
      });
    }else{
      this.openModalWithComponent('signup');
    }
  }

}
