import { Component, Input, OnInit } from '@angular/core';
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

  @Input() blogList: any = [];
  @Input() guestMode = false;
  user: any;
  bsModalRef?: BsModalRef;

  constructor(
    private modalService: BsModalService, 
    private blog: BlogService, 
    private router: Router, 
    private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getUser().subscribe((res: any) => {
      this.user = res.data;
    });
  }

  navigateBlog(id: any) {
    this.router.navigate(['./blog', id]);
  }

  truncate(source: any, size: any) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }

  openModalWithComponent(type: string) {
    type == 'login' ? this.bsModalRef = this.modalService.show(LoginComponent) : this.bsModalRef = this.modalService.show(SignupComponent)
  }


  navigateUser(id: any) {
    if (this.auth.userLoggedin() || this.auth.adminLoggedin()) {
      if (id === this.user._id) {
        this.router.navigate(['./user/profile']);
      } else {
        this.router.navigate(['./user/account', id]);
      }
    } else {
      this.openModalWithComponent('signup');
    }
  }
  
}

