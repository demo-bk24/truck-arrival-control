import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faComment as farComment } from '@fortawesome/free-regular-svg-icons';
import {
  faBan,
  faBook,
  faCheck,
  faCheckCircle,
  faCheckDouble,
  faCheckSquare,
  faComment,
  faCommentAlt,
  faEdit,
  faExclamationTriangle,
  faHandPeace,
  faHome,
  faPencilAlt,
  faQrcode,
  faSave,
  faSearch,
  faSpinner,
  faSyncAlt,
  faTruck,
} from '@fortawesome/free-solid-svg-icons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
// import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { QRCodeModule } from 'angularx-qrcode';
import { SharedModule } from 'src/app/shared/shared.module';
import { ControlRoutingModule } from './control-routing.module';
import { ControlLayout } from './control.layout';
import { ArrivalComponent } from './control/arrival/arrival.component';
import { ControlComponent } from './control/control.component';
import { ExitsComponent } from './control/exits/exits.component';
import { ItIsregisteredComponent } from './control/it-isregistered/it-isregistered.component';
import { RegistryFormComponent } from './control/registry-form/registry-form.component';
import { DriverComponent } from './driver/driver.component';
import { InitialComponent } from './driver/initial/initial.component';
import { TruckFormComponent } from './driver/truck-form/truck-form.component';
import { AssignedComponent } from './lift/assigned/assigned.component';
import { SelectModalComponent } from './lift/modals/select-modal/select-modal.component';
import { BaysComponent } from './warehouse/bays/bays.component';

@NgModule({
  declarations: [
    ControlLayout,
    RegistryFormComponent,
    ItIsregisteredComponent,
    AssignedComponent,
    BaysComponent,
    ArrivalComponent,
    ControlComponent,
    DriverComponent,
    TruckFormComponent,
    InitialComponent,
    ExitsComponent,
    SelectModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,

    FontAwesomeModule,
    ModalModule.forRoot(),
    // ProgressbarModule.forRoot(),
    BsDatepickerModule.forRoot(),
    QRCodeModule,

    ControlRoutingModule,
  ],
})
export class ControlModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faHome,
      faCheck,
      faCheckSquare,
      faEdit,
      faBook,
      faExclamationTriangle,
      faSave,
      faBan,
      faSyncAlt,
      faSearch,
      faCheckCircle,
      faCheckDouble,
      faSpinner,
      faTruck,
      faHandPeace,
      faQrcode,
      faPencilAlt,
      faComment,
      faCommentAlt,
      farComment
    );
  }
}
