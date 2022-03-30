import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin',
  template: `
  <button class="btn" routerLink="users" routerLinkActive="btn-dark">Users</button>
  <button class="btn" routerLink="blogs" routerLinkActive="btn-dark">Blogs</button>
  <button class="btn btn-danger" (click)="openModal(logout)"
				
				title="Logout">
				<img src="../../../assets/icon_logout.svg"
					alt="logout"></button>
  <router-outlet></router-outlet>
  <ng-template #logout>
	<div class="modal-body text-center">
		<p class="mt-1">Are you sure?</p>
		<button (click)="confirm()"
			type="button"
			class="btn btn-default">
			Yes
		</button>
		<button (click)="decline()"
			type="button"
			class="btn bg-black text-white">
			No
		</button>
	</div>
</ng-template>
  `,
  styles: [
  ]
})
export class AdminComponent implements OnInit {

  modalRef?: BsModalRef;

  constructor(private router:Router, private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.router.navigate(['./']);
    localStorage.clear();
  }

  decline(): void {
    this.modalRef?.hide();
  }

}
