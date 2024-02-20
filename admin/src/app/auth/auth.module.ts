import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
} from '@nebular/theme';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';

const ANGULAR: any = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  DragDropModule,
  ReactiveFormsModule,
];

const NB_MODULES: any = [
  NbLayoutModule,
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbIconModule,
];

@NgModule({
  declarations: [LoginComponent, AuthComponent],
  imports: [...ANGULAR, ...NB_MODULES, AuthRoutingModule],
})
export class AuthModule {}
