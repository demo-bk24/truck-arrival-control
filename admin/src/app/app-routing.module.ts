import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ValidateTokenGuard } from './core/guards/validate-token.guard';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => import(`./auth/auth.module`).then((m) => m.AuthModule),
  },
  {
    path: 'pages',
    component: PagesComponent,
    canActivate: [ValidateTokenGuard],
    canLoad: [ValidateTokenGuard],
    loadChildren: () =>
      import(`./pages/pages.module`).then((m) => m.PagesModule),
  },
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
