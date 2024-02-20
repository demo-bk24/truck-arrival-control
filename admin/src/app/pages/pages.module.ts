import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NbMenuModule, NbSelectModule } from '@nebular/theme';
import { ScaffoldModule } from '../core/scaffold/scaffold.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ScaffoldModule,
    NbMenuModule,
    NbSelectModule,
  ],
})
export class PagesModule {}
