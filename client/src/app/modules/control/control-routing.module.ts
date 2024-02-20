import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlLayout } from './control.layout';
import { ArrivalComponent } from './control/arrival/arrival.component';
import { RegistryFormComponent } from './control/registry-form/registry-form.component';
import { DriverComponent } from './driver/driver.component';
import { InitialComponent } from './driver/initial/initial.component';
import { TruckFormComponent } from './driver/truck-form/truck-form.component';
import { AssignedComponent } from './lift/assigned/assigned.component';
import { BaysComponent } from './warehouse/bays/bays.component';

const routes: Routes = [
  {
    path: '',
    component: ControlLayout,
    children: [
      {
        path: 'control',
        children: [
          {
            path: 'arrival',
            component: ArrivalComponent,
          },
          {
            path: 'registry-form/:dni',
            component: RegistryFormComponent,
          },
          { path: '', redirectTo: 'arrival', pathMatch: 'full' },
        ],
      },
      {
        path: 'warehouse',
        children: [
          {
            path: 'bays',
            component: BaysComponent,
          },
          { path: '', redirectTo: 'bays', pathMatch: 'full' },
        ],
      },
      {
        path: 'lift',
        children: [
          {
            path: 'assigned',
            component: AssignedComponent,
          },
          { path: '', redirectTo: 'assigned', pathMatch: 'full' },
        ],
      },
      {
        path: 'driver',
        children: [
          {
            path: '',
            component: DriverComponent,
          },
          {
            path: 'truck-form',
            component: TruckFormComponent,
          },
          {
            path: 'initial/:id',
            component: InitialComponent,
          },
          {
            path: 'register-form/:id/:plaque',
            component: TruckFormComponent,
          },
        ],
      },
      // { path: '', redirectTo: userRoute, pathMatch: 'full' }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlRoutingModule {}
