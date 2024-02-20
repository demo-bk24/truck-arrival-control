import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '@helpers/general-service';
import { END_POINTS } from '@helpers/general-service/utils';
import { NbToastrService } from '@nebular/theme';
import { AuthService } from '../../../auth/auth.service';

const { control, account } = END_POINTS;

@Component({
  selector: 'app-truck-form',
  templateUrl: './truck-form.component.html',
  styleUrls: ['./truck-form.component.scss'],
})
export class TruckFormComponent implements OnInit {
  ttypes: any[] = [];
  campus: any[] = [];
  title: string = 'Nuevo camión';

  form: FormGroup = this.fb.group({
    _id: [''],
    plaque: ['', [Validators.required, Validators.maxLength(10)]],
    type: ['', Validators.required],
    campus: ['', Validators.required],
    origin: [''],
    ruc: [''],
    company: [''],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private generalService: GeneralService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: NbToastrService
  ) {
    this.route.params.subscribe(({ id }) => {
      if (id != 'create') {
        this.get(id);
      }
    });
  }

  ngOnInit(): void {
    this.getTtypes();
    this.getCampus();
  }

  get(id: string) {
    this.title = 'Editar camión';
    this.generalService
      .filtersList$(`${control}/truck/${id}/retrieve`)
      .subscribe((res) => this.form.patchValue(res));
  }

  getTtypes() {
    this.generalService
      .filtersList$(`${control}/truck-type/list`)
      .subscribe((res) => (this.ttypes = res));
  }

  getCampus() {
    this.generalService.filtersList$(`${account}/campus`).subscribe((res) => {
      this.campus = res;
      const { campus } = this.authService.user;
      // console.log('campuss',campus);
      this.form.get('campus')?.patchValue(campus);
    });
  }

  submit() {
    const { _id, ...data } = this.form.value;
    if (_id) {
      this.generalService
        .updateUrl$(`${control}/truck/${_id}/update`, data)
        .subscribe((res) => {
          this.toastr.success(
            `Camión fue actualizado correctamente!`,
            `¡Éxito!`
          );
          this.router.navigateByUrl('/pages/control/camiones');
        });
    } else {
      this.generalService
        .addData$(`${control}/truck/create`, data)
        .subscribe((res) => {
          this.toastr.success(`Camión fue creado correctamente!`, `¡Éxito!`);
          this.router.navigateByUrl('/pages/control/camiones');
        });
    }
  }
}
