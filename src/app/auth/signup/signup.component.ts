import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/auth.service';
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
        Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')
      ]]
  });
  isValid=true;

  constructor(
    public bsModalRef: BsModalRef,
    public modalService:BsModalService, 
    private router:Router,
    private fb:FormBuilder,
    private auth:AuthService) { }

  ngOnInit(): void {
  }

  signup() {
    if(this.signupForm.valid){
      this.isValid=true;
      this.bsModalRef?.hide();
      this.auth.createUser(this.signupForm.value).subscribe(res=>{
        localStorage.setItem('token',res.data.token);
        localStorage.setItem('userId',res.data.findUser._id);
        this.router.navigate(['user']);
      },err=>{
        console.log(err);
      })
    }
    else{
      this.isValid=false;
    }
  }
  openLogin() {
    this.bsModalRef = this.modalService.show(LoginComponent)
  }

}
