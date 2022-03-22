import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/auth.service';
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
        Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')
      ]]
  });

  isValid = true;

  constructor(
    public bsModalRef: BsModalRef,
    public modalService: BsModalService,
    private router: Router,
    private fb : FormBuilder,
    private auth:AuthService
    ) { }

  ngOnInit(): void {
    // this.loginForm.setValue({
    //   'email':['yashgajera6202@gmail.com'],
    //   'password':['P@$$w0rd']
    // })
  }

  login() {
    if(this.loginForm.valid){
      this.isValid=true;
      this.bsModalRef?.hide();
      this.auth.loginUser(this.loginForm.value).subscribe(res=>{
        localStorage.setItem('token',res.data.token);
        localStorage.setItem('userId',res.data.userdata.id);
        localStorage.setItem('userName',res.data.userdata.fullName);
        localStorage.setItem('userRoleName',res.data.userdata.userType.userRoleName);
        if(res.data.userdata.userType){
          let role = res.data.userdata.userType.userRoleName
          if(role==='admin'){
            this.router.navigate(['admin']);
          }
          else if(role==='user'){
            this.router.navigate(['user']);
          }
        }
      },err=>{
        console.log(err);
      })
    }
    else{
      this.isValid=false;
    }
  }
  openSignup() {
    this.bsModalRef = this.modalService.show(SignupComponent)
  }

}
