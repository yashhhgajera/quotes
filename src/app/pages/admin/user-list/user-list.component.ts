import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userData: any;
  modalRef?: BsModalRef;
  constructor(private account: AccountsService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.showUserList()
  }

  showUserList(){
    this.account.getAccounts().subscribe((res: any) => {
      this.userData = res.data;
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

  confirm(): void {
   
  }

  decline(): void {
    this.modalRef?.hide();
  }


}
