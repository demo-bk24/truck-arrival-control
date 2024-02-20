import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { GeneralService } from '@helpers/general-service';
import { END_POINTS } from '@helpers/general-service/utils';
import { NbToastrService } from '@nebular/theme';
import { AuthService } from '../../../auth/auth.service';
import { CommonService } from '../../../helpers/common';

const { control } = END_POINTS;

@Component({
  selector: 'app-trucks',
  templateUrl: './trucks.component.html',
  styleUrls: ['./trucks.component.scss'],
})
export class TrucksComponent implements OnInit {
  loading: boolean = false;
  trucks: any[] = [];

  perPage: FormControl = this.fb.control('10');
  page: number = 1;
  total!: number;
  field: FormControl = this.fb.control('plaque');
  query: FormControl = this.fb.control('');

  constructor(
    private generalService: GeneralService,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: NbToastrService,
    private common: CommonService
  ) {}

  ngOnInit(): void {
    this.list(1);
  }

  public list(page: number) {
    this.page = page;
    let params = new HttpParams()
      .set('campus', this.authService.user.campus)
      .set(this.field.value, this.query.value)
      .set('per_page', this.perPage.value)
      .set('page', page);
    this.generalService
      .paramList$(`${control}/truck/list`, params)
      .subscribe((res) => {
        // console.log(res);
        this.trucks = res.results;
        this.total = res.total;
      });
  }

  deleteTruck(truck: any) {
    this.loading = true;
    this.generalService
      .delete$(`${control}/truck/${truck._id}/delete`)
      .subscribe(() => {
        this.toastr.success(
          `Camión ${truck.plaque} eliminado correctamente!`,
          `¡Éxito!`
        );
        this.list(1);
        this.loading = false;
      });
  }

  confirmDelete(truck: any) {
    const self = this;
    const msg = `Al eliminar ${truck.plaque}, podrías perder información que esté relacionada, si estás seguro continue por favor.`;
    this.common.showConfirm('¿Estás seguro?', msg, function (r: any) {
      if (r.isConfirmed) {
        self.deleteTruck(truck);
      }
    });
  }
}
