import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampusComponent } from './campus/campus.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'usuarios',
    component: UsersComponent,
  },
  {
    path: 'usuario/:id',
    component: UserFormComponent,
  },
  {
    path: 'sedes',
    component: CampusComponent,
  },
  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceRoutingModule {}
