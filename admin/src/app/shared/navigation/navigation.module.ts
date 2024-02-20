import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavigationDirective } from './navigation.directive';

@NgModule({
  declarations: [NavigationDirective],
  imports: [CommonModule],
  exports: [NavigationDirective],
})
export class NavigationModule {}
