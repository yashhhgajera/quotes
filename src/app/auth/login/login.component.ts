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
    email: ['',
      [
        Validators.email,
        Validators.required
      ]],
    password: ['',
      [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')
      ]]
  });
  googleData = {
    "fullName": "",
    "email": "",
    "userType":"",
    "isActive": true,
    "authToken": ""
  };

  isValid = true;
  showPassword: boolean = false;

  constructor(
    public bsModalRef: BsModalRef,
    public modalService: BsModalService,
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService,
    public alert: AlertService
  ) { }

  ngOnInit(): void {
    this.loginForm.setValue({
      'email': 'nikunj@gmail.com',
      'password': 'P@$$w0rd'
    })
    this.auth.getUserRole().subscribe((res: any) => {
      let userRole = res.data.listRole.filter((role: any) => {
        return role.userRoleName === 'user';
      });

      this.googleData['userType'] = userRole[0]._id;
    })
  }
  passwordVisibility() {
    this.showPassword = !this.showPassword;
  }

  google_login() {
    this.auth.signinwithGoogle().then((res: any) => {
      this.googleData['authToken'] = res.authToken;
      this.googleData['fullName'] = res.name;
      this.googleData['email'] = res.email;
      this.auth.googlesignin(this.googleData).subscribe((res: any) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userRoleName', 'user');
        this.router.navigate(['user']);
        this.alert.success(res.message);
        this.bsModalRef?.hide();
      }, err => {
        this.alert.error(err.statusText);
      })
    })

  }

  login() {
    if (this.loginForm.valid) {
      this.isValid = true;
      let email = this.loginForm.value.email.toLowerCase();
      this.loginForm.patchValue({
        email: email
      })
      this.auth.loginUser(this.loginForm.value).subscribe(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userRoleName', res.data.userdata.userType.userRoleName);
        if (res.data.userdata.userType) {
          let role = res.data.userdata.userType.userRoleName
          if (role === 'admin') {
            this.router.navigate(['admin']);
          }
          else if (role === 'user') {
            this.router.navigate(['user']);
          }
        }
        this.alert.success(res.message);
        this.bsModalRef?.hide();
      }, err => {
        this.alert.error(err.statusText);
      })
    }
    else {
      this.isValid = false;
    }
  }
  openSignup() {
    this.bsModalRef = this.modalService.show(SignupComponent)
  }

  resetPassword() {
    this.bsModalRef = this.modalService.show(ResetPasswordComponent)
  }

}
