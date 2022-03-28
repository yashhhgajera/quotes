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
  user:any={followers:[],followings:[]};
  blogsCount:any;

  profileData = this.fb.group({
    fullName:[''],
    email:['']
  });

  imageData = this.fb.group({
    image:['']
  })



  constructor(private fb: FormBuilder, private account: AccountsService, private blog:BlogService,private auth:AuthService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.auth.getUser().subscribe((res:any)=>{
      this.user=res.data;
      this.blog.getuserBlog(this.user._id).subscribe((res:any)=>{
        this.blogsCount = res.data.length;
      })
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }


  editProfile(userId: any){
    console.log(userId);
    this.account.updateProfile(userId, this.profileData.value).subscribe(res=>{
      this.modalRef?.hide()
    })
  }

  updateImage(userId: any){
    let data = {
      "image": this.imageData.value.image
    }
    this.account.updateProfile(userId, data).subscribe(res=>{
      console.log("Image Updated successfully");
    })
  }
}
