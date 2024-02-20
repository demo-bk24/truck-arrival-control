import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from '../../../../services/auth.service';
import { CampusService } from '../../../../services/campus.service';

@Component({
  selector: 'app-campus-modal',
  templateUrl: './campus-modal.component.html',
  styleUrls: ['./campus-modal.component.scss'],
})
export class CampusModalComponent implements OnInit {
  @Input() campus: any = [];
  sede: FormControl = this.fb.control('');

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private authService: AuthService,
    private campusService: CampusService
  ) {}

  ngOnInit() {
    // console.log(this.campus)
  }

  changeCampus(event: any) {
    const { uid } = this.authService.user;
    const campus = event.value;
    this.campusService.updateCampus(uid, { campus }).subscribe(() => this.refresh());
  }

  refresh(): void {
    window.location.reload();
  }
}
