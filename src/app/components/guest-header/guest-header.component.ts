import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { SignupComponent } from 'src/app/auth/signup/signup.component';

@Component({
  selector: 'app-guest-header',
  templateUrl: './guest-header.component.html',
  styleUrls: ['./guest-header.component.scss']
})
export class GuestHeaderComponent implements OnInit {

  bsModalRef?: BsModalRef;
  modalRef?: BsModalRef;

  constructor(private modalService: BsModalService, private router: Router) { }

  openModalWithComponent(type: string) {
    type == 'login' ? this.bsModalRef = this.modalService.show(LoginComponent) : this.bsModalRef = this.modalService.show(SignupComponent)
  }



  ngOnInit(): void {
  }


}
