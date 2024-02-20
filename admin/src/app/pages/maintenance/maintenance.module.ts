import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BaseModule } from '@helpers/base';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeaderInfoModule } from 'src/app/helpers/header-info';
import { ErrorMessageModule } from '../../helpers/error-message/error-message.module';
import { WindowModule } from '../../helpers/window/window.module';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { CampusFormComponent } from './campus-form/campus-form.component';
import { CampusComponent } from './campus/campus.component';
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    UsersComponent,
    CampusComponent,
    UserFormComponent,
    CampusFormComponent,
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    BaseModule,
    HeaderInfoModule,
    RouterModule,
    NavigationModule,
    WindowModule,
    FormsModule,
    NgxPaginationModule,
    ErrorMessageModule,
  ],
})
export class MaintenanceModule {}
