import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Subject, delay, takeUntil } from 'rxjs';
import { AuthService } from '../../../../auth/auth.service';
import { SpinnerService } from '../../../interceptors/spinner.service';
import { CampusModalComponent } from './campus-modal/campus-modal.component';

@Component({
  selector: 'app-one-column',
  templateUrl: './one-column.component.html',
  styles: [
    `
      ::ng-deep .fixed {
        padding-block: 10px !important;
      }
    `,
  ],
})
export class OneColumnComponent implements OnInit {
  spinner!: boolean;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private spinnerService: SpinnerService,
    private authService: AuthService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.varifyCampus();
    this.spinnerService
      .getStatusSpinner()
      .pipe(takeUntil(this.destroy$), delay(0))
      .subscribe((status: boolean) => (this.spinner = status));
  }

  varifyCampus() {
    // console.log(this.authService.user);
    if (!this.authService.user.campus) {
      this.openModal();
    }
  }

  openModal() {
    const dialogConfig = {
      dialogClass: 'dialog-limited-height',
      closeOnBackdropClick: false,
      closeOnEsc: false,
    };
    this.dialogService.open(CampusModalComponent, dialogConfig);
  }
}
