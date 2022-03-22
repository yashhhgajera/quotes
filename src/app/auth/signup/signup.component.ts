import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  
  signupForm =  this.fb.group({
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
      ]],
    userType:['']
  });;
  isValid=true;

  constructor(
    public bsModalRef: BsModalRef,
    public modalService:BsModalService, 
    private router:Router,
    private fb:FormBuilder,
    private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.getUserRole().subscribe((res:any)=>{
      let userRole = res.data.listRole.find((role:any)=>{
        return role.userRoleName==='user';
      });
      this.signupForm.patchValue({
        userType:userRole._id
      }) 
    })
  }

  signup() {
    if(this.signupForm.valid){
      this.isValid=true;
      this.bsModalRef?.hide();
      this.auth.createUser(this.signupForm.value).subscribe(res=>{
        localStorage.setItem('token',res.data.token);
        localStorage.setItem('userId',res.data.findUser._id);
        localStorage.setItem('userName',res.data.findUser.fullName);
        localStorage.setItem('userRoleName',res.data.findUser.userType.userRoleName);
        if(res.data.findUser.userType){
          let role = res.data.findUser.userType.userRoleName
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
  openLogin() {
    this.bsModalRef = this.modalService.show(LoginComponent)
  }

}
