import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AccountsService } from 'src/app/services/accounts.service';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  
  userAccount:any;
  user:any='';
  blogsCount:any=0;
  
  constructor(private account:AccountsService,private route:ActivatedRoute,private blog:BlogService,private auth:AuthService) { }

  ngOnInit(): void {
    this.showAccount();
  }

  showAccount(){
    this.auth.getUser().subscribe((res:any)=>{
      this.user=res.data;
      this.route.paramMap.subscribe((params:ParamMap)=>{
        this.user._id = params.get('id');
      })
      this.account.getAccounts().subscribe((res:any)=>{
        this.userAccount = res.data.filter((u:any)=>{
          return u._id==this.user._id
        });
      });
      this.blog.getuserBlog(this.user._id).subscribe((res:any)=>{
        this.blogsCount = res.data.length;
      })
    })
  }

  follow(accountId: any){
    this.auth.getUser().subscribe((res:any)=>{
      this.user=res.data;
      let id = {
        userId: this.user._id
      } 
      this.account.follow(accountId,id).subscribe((res:any)=>{
        this.showAccount();
      },err=>{
        console.log(err)
      })
    });
  }
  unfollow(accountId: any){
    this.auth.getUser().subscribe((res:any)=>{
      this.user=res.data;
      let id = {
        userId: this.user._id
      } 
      this.account.unfollow(accountId,id).subscribe((res:any)=>{
        this.showAccount();
      },err=>{
        console.log(err)
      })
    });
  }
}
