import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AccountsService } from 'src/app/services/accounts.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  
  userAccount:any;
  userId:any;
  blogsCount:any=0;
  
  constructor(private account:AccountsService,private route:ActivatedRoute,private blog:BlogService) { }

  ngOnInit(): void {
    this.showAccount();
  }

  showAccount(){
    this.route.paramMap.subscribe((params:ParamMap)=>{
      this.userId = params.get('id');
    })
    this.account.getAccounts().subscribe((res:any)=>{
      this.userAccount = res.data.filter((u:any)=>{
        return u._id==this.userId
      });
    });
    this.blog.getuserBlog(this.userId).subscribe((res:any)=>{
      this.blogsCount = res.data.length;
    })
  }

  follow(accountId: any){
    let id = {
      userId: this.blog.getUserId()
    } 
    this.account.follow(accountId,id).subscribe((res:any)=>{
      this.showAccount();
      console.log(res.data)
    },err=>{
      console.log(err)
    })
  }
  unfollow(accountId: any){
    let id = {
      userId: this.blog.getUserId()
    } 
    this.account.unfollow(accountId,id).subscribe((res:any)=>{
      this.showAccount();
      console.log(res.data)
    },err=>{
      console.log(err)
    })
  }
}
