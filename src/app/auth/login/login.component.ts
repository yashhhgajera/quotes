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
    email:['',
      [
        Validators.email,
        Validators.required
      ]],
    password:['',
      [
        Validators.required,
        Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$')
      ]]
  });

  isValid = true;

  constructor(
    public bsModalRef: BsModalRef,
    public modalService: BsModalService,
    private router: Router,
    private fb : FormBuilder
    ) { }

  ngOnInit(): void {
  }

  login() {
    if(this.loginForm.valid){
      this.router.navigate(['user']);
      this.isValid=true;
      this.bsModalRef?.hide();
      console.log(this.loginForm.value);
    }
    else{
      this.isValid=false;
    }
  }
  openSignup() {
    this.bsModalRef = this.modalService.show(SignupComponent)
  }

}
