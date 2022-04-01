import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertService } from 'src/app/services/alert.service';
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
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')
      ]],
    userType:['']
  });;
  isValid=true;
  showPassword: boolean = false;


  constructor(
    public bsModalRef: BsModalRef,
    public modalService:BsModalService, 
    private router:Router,
    private fb:FormBuilder,
    private auth:AuthService,
    public alert:AlertService) { }

  ngOnInit(): void {
    this.auth.getUserRole().subscribe((res:any)=>{
      let userRole = res.data.listRole.filter((role:any)=>{
        return role.userRoleName==='user';
      });
      this.signupForm.patchValue({
        userType:userRole[0]._id
      }) 
    })
  }
  passwordVisibility(){
    this.showPassword = !this.showPassword;
  }

  signup() {
    if(this.signupForm.valid){
      this.isValid=true;
      this.auth.createUser(this.signupForm.value).subscribe(res=>{
        localStorage.setItem('token',res.data.token);
        localStorage.setItem('userRoleName',res.data.findUser.userType.userRoleName);
        if(res.data.findUser.userType){
          let role = res.data.findUser.userType.userRoleName
          if(role==='admin'){
            this.router.navigate(['admin']);
          }
          else if(role==='user'){
            this.router.navigate(['user']);
          }
          this.alert.success(res.message);
          this.bsModalRef?.hide();
        }
      },err=>{
        this.alert.error(err.statusText);
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
