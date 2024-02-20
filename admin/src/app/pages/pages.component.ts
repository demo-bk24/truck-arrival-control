import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { MenuDataService } from '../core/scaffold/services/menu-data.service';

@Component({
  selector: 'app-pages',
  template: `
    <app-one-column>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </app-one-column>
  `,
  styles: [
    `
      @import '../../assets/themes.scss';
      @include nb-install-component() {
        ::ng-deep router-outlet + * {
          display: block;
          animation: fade 1s;

          @keyframes fade {
            from {
              opacity: 0;
            }

            to {
              opacity: 1;
            }
          }
        }
      }
    `,
  ],
})
export class PagesComponent implements OnInit {
  menu: NbMenuItem[] = [];

  constructor(private menuDataService: MenuDataService) {}

  ngOnInit(): void {
    this.menuDataService.menu().subscribe((menu: any) => (this.menu = menu));
  }
}
