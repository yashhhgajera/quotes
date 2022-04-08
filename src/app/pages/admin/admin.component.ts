import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin',
  template: `
  <nav class="bg-light border-bottom w-100 p-2 d-flex justify-content-between">
    <div>
      <button *ngIf="false" class="btn btn-secondary me-3" routerLink="/user">User Mode</button>
      <button class="btn btn-sm me-2" routerLink="users" routerLinkActive="btn-dark">Users</button>
      <button class="btn btn-sm" routerLink="blogs" routerLinkActive="btn-dark">Blogs</button>
    </div>
    <h1 class="p-0 m-0 text-center">
      Administration Panel
    </h1>
    <div>
      <button class="btn btn-danger" (click)="openModal(logout)" title="Logout">
        Log out
      </button>
    </div>
  </nav>
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

  constructor(private router: Router, private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
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
