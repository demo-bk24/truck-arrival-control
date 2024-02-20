import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { GeneralService } from '@helpers/general-service';
import { END_POINTS } from '@helpers/general-service/utils';
import { NbToastrService } from '@nebular/theme';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonService } from '../../../helpers/common';

const { account } = END_POINTS;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  loading: boolean = false;
  currentUser: any = this.authService.user.uid;

  forma = this.fb.group({
    field: ['document'],
    query: ['', [Validators.required]],
  });

  users: any[] = [];
  totalUsers: number = 0;

  perPage: FormControl = this.fb.control('10');
  page: number = 1;

  params: any = {
    page: this.page,
    pageSize: this.perPage.value,
    campus: this.authService.user.campus,
  };

  field: FormControl = this.fb.control('firstName');
  query: FormControl = this.fb.control('');

  constructor(
    private generalService: GeneralService,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private authService: AuthService,
    private toastr: NbToastrService,
    private common: CommonService
  ) {}

  ngOnInit(): void {
    this.list(1);
  }

  public list(page: number) {
    this.page = page;
    this.params.page = this.page;
    this.generalService
      .paramList$(`${account}/users`, this.params)
      .subscribe((res) => {
        this.users = res.results;
        this.totalUsers = res.total;
      });
  }

  filter() {
    delete this.params.firstName;
    delete this.params.lastName;
    delete this.params.document;
    const t: any = this.forma.value;
    const obj = {
      [t.field]: t.query,
    };
    this.params = { ...this.params, ...obj };
    // console.log(this.params);
    this.list(1);
  }

  update(user: any) {
    this.generalService
      .updateUrl$(`${account}/${user.uid}/update`, user)
      .subscribe((res) => {
        this.toastrService.show(`Privilegios actualizados`, `Actualizado`, {
          status: 'success',
        });
      });
  }

  deleteUser(user: any) {
    this.loading = true;
    this.generalService
      .delete$(`${account}/${user.uid}/delete`)
      .subscribe(() => {
        this.toastr.success(
          `Usuario ${user.firstName} eliminado correctamente!`,
          `¡Éxito!`
        );
        this.list(1);
        this.loading = false;
      });
  }

  confirmDelete(user: any) {
    const self = this;
    const msg = `Al eliminar al usuario ${user.firstName}, podrías perder información que esté relacionada, si estás seguro continue por favor.`;
    this.common.showConfirm('¿Estás seguro?', msg, function (r: any) {
      if (r.isConfirmed) {
        self.deleteUser(user);
      }
    });
  }
}
