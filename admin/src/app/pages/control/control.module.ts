import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BaseModule } from '@helpers/base';
import { WindowModule } from '@helpers/window';
import { NgxPaginationModule } from 'ngx-pagination';
import { ErrorMessageModule } from '../../helpers/error-message/error-message.module';
import { HeaderInfoModule } from '../../helpers/header-info/header-info.module';

import { BahiaFormComponent } from './bahia-form/bahia-form.component';
import { BahiasComponent } from './bahias/bahias.component';
import { ControlRoutingModule } from './control-routing.module';
import { LiftModalComponent } from './lift-modal/lift-modal.component';
import { LifttruckFormComponent } from './lifttruck-form/lifttruck-form.component';
import { LifttruckComponent } from './lifttruck/lifttruck.component';
import { RegistriesComponent } from './registries/registries.component';
import { TruckFormComponent } from './truck-form/truck-form.component';
import { TrucksComponent } from './trucks/trucks.component';
import { TruckstypesComponent } from './truckstypes/truckstypes.component';

@NgModule({
  declarations: [
    BahiasComponent,
    LifttruckComponent,
    RegistriesComponent,
    TrucksComponent,
    TruckstypesComponent,
    BahiaFormComponent,
    LifttruckFormComponent,
    TruckFormComponent,
    LiftModalComponent,
  ],
  imports: [
    CommonModule,
    ControlRoutingModule,
    BaseModule,
    HeaderInfoModule,
    WindowModule,
    NgxPaginationModule,
    FormsModule,
    ErrorMessageModule,
  ],
})
export class ControlModule {}
