import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccountsService } from 'src/app/services/accounts.service';
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
    fullName: [''],
    email: ['']
  });

  imageData = this.fb.group({
    image: ['']
  });

  constructor(private fb: FormBuilder, private account: AccountsService, private blog: BlogService, private auth: AuthService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.showUserData();
  }
  
  showUserData(){
    this.auth.getUser().subscribe((res:any)=>{
      this.user = res.data;
      this.blog.getuserBlog(this.user._id).subscribe((res:any)=>{
        this.blogsCount = res.data.length;
      })
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }


  editProfile(userId: any) {
    console.log(userId);
    this.account.updateProfile(userId, this.profileData.value).subscribe(res => {
      this.showUserData();
      this.modalRef?.hide()
    })
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }

  updateImage(userId: any) {
    const imageData = new FormData();
    imageData.append('image', this.selectedFile, this.selectedFile?.name)
    this.account.updateImage(userId, imageData).subscribe(res => {
      this.showUserData();
      console.log("Image Updated successfully");
    })
  }
}
