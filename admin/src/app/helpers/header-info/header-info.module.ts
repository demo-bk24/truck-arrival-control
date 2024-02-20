import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';
import { HeaderInfoComponent } from './header-info.component';

@NgModule({
  declarations: [HeaderInfoComponent],
  exports: [HeaderInfoComponent],
  imports: [CommonModule, NbCardModule, NbIconModule, NbButtonModule],
})
export class HeaderInfoModule {}
