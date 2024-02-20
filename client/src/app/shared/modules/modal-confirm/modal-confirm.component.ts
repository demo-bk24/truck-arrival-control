import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-confirm',
  template: `
    <div class="p-3">
      <div class="text-center">
        <h3 class="{{color}}">{{title}}</h3>
        <fa-icon class="{{colorIcon}} mb-3" size="2x" [icon]="['fas', icon]"></fa-icon>
        <p class="mb-3">
          {{message}}
        </p>
        <div class="d-grid gap-2">
          <button class="btn btn-primary" (click)="navigate()" >
            <fa-icon [icon]="['fas', iconBtn ]"></fa-icon>
            {{textBtn}}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class ModalConfirmComponent implements OnInit {

  title?: string;
  color?: string;
  message?: string;
  colorIcon?: string;
  icon?: any;
  iconBtn?: any;
  link: any;
  textBtn?: string;

  constructor(
    public bsModalRef: BsModalRef,
    private router: Router
  ) { }

  ngOnInit() {
  }

  navigate() {
    this.bsModalRef.hide();
    this.router.navigateByUrl(this.link);
  }

}
