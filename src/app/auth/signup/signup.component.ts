import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm = this.fb.group({
    fullName:['',
      [
        Validators.required
      ]],
    email:['',
      [
        Validators.email,
        Validators.required
      ]],
    password:['',
      [
        Validators.required,
        Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$')
      ]],
    confirmPassword:['',
      [
        Validators.required,
        Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$')
      ]]
  });
  isValid=true;

  constructor(
    public bsModalRef: BsModalRef,
    public modalService:BsModalService, 
    private router:Router,
    private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  login() {
    if(this.signupForm.valid){
      this.router.navigate(['user']);
      this.isValid=true;
      this.bsModalRef?.hide();
      console.log(this.signupForm.value);
    }
    else{
      this.isValid=false;
    }
  }
  openLogin() {
    this.bsModalRef = this.modalService.show(LoginComponent)
  }

}
