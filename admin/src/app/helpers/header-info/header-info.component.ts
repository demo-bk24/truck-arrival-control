import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-info',
  templateUrl: './header-info.component.html',
  styleUrls: ['./header-info.component.scss'],
})
export class HeaderInfoComponent {
  @Input() status:
    | 'basic'
    | 'primary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'control' = 'primary';
  @Input() icon = 'alert-circle-outline';
  @Input() title = '';
  @Input() description = '';
}
