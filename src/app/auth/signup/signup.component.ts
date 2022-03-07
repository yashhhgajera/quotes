import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef,public modalService:BsModalService, private router:Router) { }

  ngOnInit(): void {
  }

  login() {
    this.router.navigate(['user']);
  }
  openLogin() {
    this.bsModalRef = this.modalService.show(LoginComponent)
  }

}
