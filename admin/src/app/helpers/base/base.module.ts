import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import {
  NbAccordionModule,
  NbActionsModule,
  NbAlertModule,
  NbAutocompleteModule,
  NbBaseCalendarModule,
  NbButtonGroupModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbContextMenuModule,
  NbDatepickerModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbPopoverModule,
  NbProgressBarModule,
  NbRadioModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbTagModule,
  NbTimepickerModule,
  NbToastrModule,
  NbToggleModule,
  NbTooltipModule,
  NbUserModule,
} from '@nebular/theme';

const ANGULAR: any[] = [CommonModule, ReactiveFormsModule];

const COMPONENTS: any[] = [
  NbCardModule,
  NbTabsetModule,
  NbButtonModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbAutocompleteModule,
  NbTimepickerModule,
  NbRadioModule,
  NbCheckboxModule,
  NbTooltipModule,
  NbToggleModule,
  NbDialogModule.forChild(),
  NbAlertModule,
  NbListModule,
  NbAccordionModule,
  NbActionsModule,
  NbPopoverModule,
  NbSpinnerModule,
  NbContextMenuModule,
  NbUserModule,
  NbFormFieldModule,
  NbButtonGroupModule,
  NbBaseCalendarModule,
  NbTagModule,
  NbDatepickerModule.forRoot(),
  NbTimepickerModule.forRoot(),
  NbDateFnsDateModule,
  NbToastrModule.forRoot(),
  NbProgressBarModule,
];

@NgModule({
  declarations: [],
  imports: [...ANGULAR, ...COMPONENTS],
  exports: [...ANGULAR, ...COMPONENTS],
})
export class BaseModule {}
