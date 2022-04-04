import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccountsService } from 'src/app/services/accounts.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  modalRef?: BsModalRef;
  config = {
    animated: true
  };
  selectedFile: File | any;
  user: any = { followers: [], followings: [] };
  blogsCount: any;

  profileData = this.fb.group({
    fullName: ['',[Validators.required]],
    email: ['',[Validators.email,Validators.required]]
  });

  imageData = this.fb.group({
    image: ['',[Validators.required]]
  });
  isValid = true;

  constructor(
    private fb: FormBuilder, 
    private account: AccountsService, 
    private blog: BlogService, 
    private auth: AuthService, 
    private modalService: BsModalService,
    public alert:AlertService) { }

  ngOnInit(): void {
    this.showUserData();
  }
  
  showUserData(){
    this.auth.getUser().subscribe((res:any)=>{
      this.user = res.data;
      this.blog.getuserBlog(this.user._id).subscribe((res:any)=>{
        this.blogsCount = res.data.length;
      })
      this.profileData.setValue({
        fullName: this.user.fullName,
        email: this.user.email
      })
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }


  editProfile(userId: any) {
    if(this.profileData.valid){
      this.isValid=true;
      this.account.updateProfile(userId, this.profileData.value).subscribe((res:any) => {
        this.user = res.data;
        this.alert.success(res.message);
        this.modalRef?.hide();
      },err=>{
        this.alert.error(err.statusText);
      })
    }else{
      this.isValid=false;
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  updateImage(userId: any) {
    if(this.imageData.valid){
      this.isValid=true;
      const imageData = new FormData();
      imageData.append('image', this.selectedFile, this.selectedFile?.name)
      this.account.updateImage(userId, imageData).subscribe((res:any) => {
        // this.user.profilePicUrl = this.selectedFile?.name;
        this.showUserData();
        this.alert.success(res.message);
        this.modalRef?.hide();
      },err=>{
        this.alert.error(err.statusText);
      })
    }else{
      this.isValid=false;
    }
  }
}
