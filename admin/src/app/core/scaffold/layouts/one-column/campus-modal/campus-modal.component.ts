import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { AuthService } from '../../../../../auth/auth.service';
import { GeneralService } from '../../../../../helpers/general-service';
import { END_POINTS } from '../../../../../helpers/general-service/utils';

const { account } = END_POINTS;

@Component({
  selector: 'app-campus-modal',
  templateUrl: './campus-modal.component.html',
  styleUrls: ['./campus-modal.component.scss'],
})
export class CampusModalComponent implements OnInit {
  campus: any[] = [];
  sede: FormControl = this.fb.control('');

  constructor(
    private dialogRef: NbDialogRef<CampusModalComponent>,
    private authService: AuthService,
    private generalService: GeneralService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCampus();
  }

  getCampus() {
    this.generalService
      .filtersList$(`${account}/campus`)
      .subscribe((res) => (this.campus = res));
  }

  changeCampus(campus: string) {
    const { uid } = this.authService.user;
    this.generalService
      .updateUrl$(`${account}/${uid}/update`, { campus })
      .subscribe(() => this.refresh());
  }

  refresh(): void {
    window.location.reload();
  }
}
