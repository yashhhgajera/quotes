import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccountsService } from 'src/app/services/accounts.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userData: any;
  roles:any ={
    admin:'',
    user:''
  }
  modalRef?: BsModalRef;
  constructor(
    private account: AccountsService,
    private auth:AuthService,
    private modalService: BsModalService,
    private router:Router) { }

  ngOnInit(): void {
    this.showUserList()
  }

  showUserList(){
    this.account.getAccounts().subscribe((res: any) => {
      this.userData = res.data;
      this.auth.getUserRole().subscribe((res:any)=>{
        this.roles.admin = res.data.listRole.find((role:any)=>role.userRoleName==='admin');
        this.roles.user = res.data.listRole.find((role:any)=>role.userRoleName==='user');
      })
    });
 
  }
  removeUSer(userId: any){
    this.modalRef?.hide();
    this.account.deleteUser(userId).subscribe(() => { 
      let userIndex = this.userData.findIndex((i:any) => i._id === userId);
      this.userData.splice(userIndex, 1);
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  decline(): void {
    this.modalRef?.hide();
  }
  navigateUser(id:any){
    this.router.navigate(['./admin/users',id]);
  }


}
