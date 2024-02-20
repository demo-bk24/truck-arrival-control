import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BahiasComponent } from './bahias/bahias.component';
import { LifttruckComponent } from './lifttruck/lifttruck.component';
import { RegistriesComponent } from './registries/registries.component';
import { TruckFormComponent } from './truck-form/truck-form.component';
import { TrucksComponent } from './trucks/trucks.component';
import { TruckstypesComponent } from './truckstypes/truckstypes.component';

const routes: Routes = [
  {
    path: 'registros',
    component: RegistriesComponent,
  },
  {
    path: 'bahias',
    component: BahiasComponent,
  },
  {
    path: 'montacargas',
    component: LifttruckComponent,
  },
  {
    path: 'camiones',
    component: TrucksComponent,
  },
  {
    path: 'camion/:id',
    component: TruckFormComponent,
  },
  {
    path: 'tipos-camiones',
    component: TruckstypesComponent,
  },
  {
    path: '',
    redirectTo: 'registros',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlRoutingModule {}
