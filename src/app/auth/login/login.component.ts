import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
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
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')
      ]]
  });

  isValid = true;
  showPassword: boolean = false;

  constructor(
    public bsModalRef: BsModalRef,
    public modalService: BsModalService,
    private router: Router,
    private fb : FormBuilder,
    private auth:AuthService,
    public alert:AlertService
    ) { }

  ngOnInit(): void {
    this.loginForm.setValue({
      'email':'nikunj@gmail.com',
      'password':'P@$$w0rd'
    })
  }
  passwordVisibility(){
    this.showPassword = !this.showPassword;
  }

  login() {
    if(this.loginForm.valid){
      this.isValid=true;
      this.auth.loginUser(this.loginForm.value).subscribe(res=>{
        localStorage.setItem('token',res.data.token);
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
        this.alert.success(res.message);
        this.bsModalRef?.hide();
      },err=>{
        this.alert.error(err.statusText);
      })
    }
    else{
      this.isValid=false;
    }
  }
  openSignup() {
    this.bsModalRef = this.modalService.show(SignupComponent)
  }
  
  resetPassword() {
    this.bsModalRef = this.modalService.show(ResetPasswordComponent)
  }

}
