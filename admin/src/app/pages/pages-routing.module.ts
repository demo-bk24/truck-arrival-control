import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'mantenimiento',
    loadChildren: () =>
      import(`./maintenance/maintenance.module`).then(
        (m) => m.MaintenanceModule
      ),
  },
  {
    path: 'control',
    loadChildren: () =>
      import(`./control/control.module`).then((m) => m.ControlModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
