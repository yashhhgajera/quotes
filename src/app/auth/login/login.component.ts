import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email:['',Validators.email],
    password:['',Validators.required]
  });

  constructor(
    public bsModalRef: BsModalRef,
    public modalService: BsModalService,
    private router: Router,
    private fb : FormBuilder
    ) { }

  ngOnInit(): void {
  }

  login() {
    this.router.navigate(['user']);
  }
  openSignup() {
    this.bsModalRef = this.modalService.show(SignupComponent)
  }

}
