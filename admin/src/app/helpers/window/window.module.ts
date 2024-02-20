import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WindowDirective } from './window.directive';

@NgModule({
  declarations: [WindowDirective],
  imports: [CommonModule],
  exports: [WindowDirective],
})
export class WindowModule {}
