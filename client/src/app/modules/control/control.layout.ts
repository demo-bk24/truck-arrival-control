import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin',
  template: `
    <app-navbar></app-navbar>
    <div class="container mt-4">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class ControlLayout extends Socket {
  constructor() {
    super({ url: environment.wsUrl, options: {} });
    this.ioSocket['auth'] = { 'x-token': localStorage.getItem('access_token') };
  }
}
