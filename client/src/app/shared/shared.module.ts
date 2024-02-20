import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'ngx-avatar';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { CampusModalComponent } from './components/navbar/campus-modal/campus-modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TimerPickingComponent } from './components/timer-picking/timer-picking.component';
import { TimerComponent } from './components/timer/timer.component';
import { ToggleFullscreenDirective } from './directives/toggle-fullscreen.directive';

@NgModule({
  declarations: [
    NavbarComponent,
    ToggleFullscreenDirective,
    TimerComponent,
    TimerPickingComponent,
    CampusModalComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AvatarModule,
    BsDropdownModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    NavbarComponent,
    TimerComponent,
    TimerPickingComponent,
    ToggleFullscreenDirective,
  ],
})
export class SharedModule {}
