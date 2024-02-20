import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faArrowAltCircleRight,
  faBook,
  faCheck,
  faExclamationTriangle,
  faSignInAlt,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { AuthComponent } from 'src/app/layout/auth/auth.component';
import { ModalConfirmModule } from 'src/app/shared/modules/modal-confirm/modal-confirm.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegistrationComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FontAwesomeModule,
    ModalConfirmModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faBook,
      faExclamationTriangle,
      faArrowAltCircleRight,
      faCheck,
      faSignInAlt,
      faSpinner
    );
  }
}
