import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateTokenGuard } from './core/guards/validate-token.guard';

const userRoute: any = localStorage.getItem('route') || '/control';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'control',
    canActivate: [ValidateTokenGuard],
    canLoad: [ValidateTokenGuard],
    loadChildren: () =>
      import('./modules/control/control.module').then((m) => m.ControlModule),
  },
  {
    path: 'tv',
    loadChildren: () =>
      import('./modules/public/public.module').then((m) => m.PublicModule),
  },
  { path: '', redirectTo: userRoute, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
