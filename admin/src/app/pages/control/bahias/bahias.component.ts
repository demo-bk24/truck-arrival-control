import { Component, OnInit } from '@angular/core';
import { GeneralService } from '@helpers/general-service';
import { END_POINTS } from '@helpers/general-service/utils';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonService } from '../../../helpers/common';
import { BahiaFormComponent } from '../bahia-form/bahia-form.component';

const { control } = END_POINTS;
@Component({
  selector: 'app-bahias',
  templateUrl: './bahias.component.html',
  styleUrls: ['./bahias.component.scss'],
})
export class BahiasComponent implements OnInit {
  loading: boolean = false;
  bays: any[] = [];

  constructor(
    private dialogService: NbDialogService,
    private generalService: GeneralService,
    private authService: AuthService,
    private toastr: NbToastrService,
    private common: CommonService
  ) {}

  ngOnInit(): void {
    this.all();
  }

  all() {
    this.generalService
      .paramList$(`${control}/bay/list`, {
        campus: this.authService.user.campus,
      })
      .subscribe((res) => {
        this.bays = res;
      });
  }

  openModal(data?: any) {
    const dialogConfig = {
      dialogClass: 'dialog-limited-height',
      context: { data },
      closeOnBackdropClick: true,
      closeOnEsc: true,
    };
    this.dialogService
      .open(BahiaFormComponent, dialogConfig)
      .onClose.subscribe((load) => {
        if (load) {
          this.all();
        }
      });
  }

  update(bay: any) {
    this.generalService
      .updateUrl$(`${control}/bay/${bay._id}/update`, bay)
      .subscribe((res) => {
        this.toastr.success(
          `Bahia ${bay.name} actualizado correctamente!`,
          `¡Éxito!`
        );
        this.all();
      });
  }

  deleteBahia(bay: any) {
    this.loading = true;
    this.generalService
      .delete$(`${control}/bay/${bay._id}/delete`)
      .subscribe(() => {
        this.toastr.success(
          `Bahia ${bay.name} eliminado correctamente!`,
          `¡Éxito!`
        );
        this.all();
        this.loading = false;
      });
  }

  confirmDelete(bay: any) {
    const self = this;
    const msg = `Al eliminar ${bay.name}, podrías perder información que esté relacionada, si estás seguro continue por favor.`;
    this.common.showConfirm('¿Estás seguro?', msg, function (r: any) {
      if (r.isConfirmed) {
        self.deleteBahia(bay);
      }
    });
  }
}
