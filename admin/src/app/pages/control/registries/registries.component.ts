import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { AuthService } from '../../../auth/auth.service';
import { CommonService } from '../../../helpers/common';
import { GeneralService } from '../../../helpers/general-service';
import { END_POINTS } from '../../../helpers/general-service/utils';

const { control } = END_POINTS;

@Component({
  selector: 'app-registries',
  templateUrl: './registries.component.html',
  styleUrls: ['./registries.component.scss'],
})
export class RegistriesComponent implements OnInit {
  loading = false;

  formatedDate: any;
  status = [
    'LLEGADA',
    'DESCARGANDO',
    'DESCARGADO',
    'CARGA',
    'CARGANDO',
    'CARGADO',
    'SALIDA',
  ];
  dateForm = this.fb.group({ fecha: [new Date()] });
  forma = this.fb.group({
    field: ['document'],
    query: ['', [Validators.required]],
  });

  modalRef: any;
  registry: any;
  bahias: any;
  regForm!: FormGroup;

  registries: any[] = [];
  totalRegistries: number = 0;

  perPage: FormControl = this.fb.control('8');
  page: number = 1;

  params: any = {
    page: this.page,
    pageSize: this.perPage.value,
    campus: this.authService.user.campus,
  };

  field: FormControl = this.fb.control('plaque');
  query: FormControl = this.fb.control('');

  constructor(
    private fb: FormBuilder,
    private dialogService: NbDialogService,
    private common: CommonService,
    private toastr: NbToastrService,
    private generalService: GeneralService,
    private datePipe: DatePipe,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.reactiveFields();
    this.dateForm.valueChanges.subscribe((r) => {
      this.filtrarByDate(r.fecha);
    });
    this.loadBays();
  }

  reactiveFields() {
    const controls = {
      state: ['LLEGADA'],
      unloadBay: [''],
      loadBay: [''],
      observation: ['', [Validators.maxLength(300)]],
    };
    this.formatedDate = this.datePipe.transform(
      this.dateForm.controls.fecha.value,
      'yyyy-MM-dd'
    );
    this.params.fecha = this.dateForm.controls.fecha.value?.toJSON();
    this.regForm = this.fb.group(controls);
    this.list(1);
  }

  public list(page: number) {
    this.page = page;
    this.params.page = this.page;
    this.generalService
      .paramList$(`${control}/registry/list`, this.params)
      .subscribe((res) => {
        this.registries = res.results;
        this.totalRegistries = res.total;
      });
  }

  public openRegForm(dialog: TemplateRef<any>, instance?: any) {
    this.regForm.reset();
    this.registry = instance;
    const { state, unloadBay, loadBay, observation } = instance;
    this.regForm.patchValue({
      state,
      unloadBay: unloadBay._id,
      loadBay: loadBay._id,
      observation,
    });
    const dialogConfig = {
      dialogClass: 'dialog-limited-height',
      context: {},
      closeOnBackdropClick: true,
      closeOnEsc: true,
    };
    this.modalRef = this.dialogService.open(dialog, dialogConfig);
  }

  save() {
    this.loading = true;
    this.generalService
      .updateUrl$(
        `${control}/registry/${this.registry._id}/update`,
        this.regForm.value
      )
      .subscribe((r: any) => {
        this.toastr.success(`Registro actualizado correctamente!`, `¡Éxito!`);
        this.loading = false;
        this.modalRef.close();
        this.list(1);
      });
  }

  filtrarByDate(date: any) {
    if (date) {
      this.params.fecha = date.toJSON();
    } else {
      delete this.params.fecha;
    }
    this.list(1);
  }

  filter() {
    delete this.params.plaque;
    delete this.params.document;
    const t: any = this.forma.value;
    const obj = {
      [t.field]: t.query,
    };
    this.params = { ...this.params, ...obj };
    this.list(1);
  }

  private destroy(reg: any) {
    this.loading = true;
    this.generalService
      .deleteUrl$(`${control}/registry/${reg._id}/delete`)
      .subscribe((r: any) => {
        this.toastr.success(
          `Registro del vehiculo ${reg.truck.plaque} eliminado correctamente!`,
          `¡Éxito!`
        );
        this.list(1);
        this.loading = false;
      });
  }

  public confirmDestroy(reg: any): void {
    const self = this;
    const msg = `Estás tratando de eliminar el registro del vehículo "${reg.truck.plaque}", podrías perder información relacionada, si estás seguro continue por favor.`;
    this.common.showConfirm('CUIDADO!', msg, function (r: any) {
      if (r.isConfirmed) {
        self.destroy(reg);
      }
    });
  }

  public loadBays() {
    this.generalService
      .filtersList$(`${control}/bay/withregistry`)
      .subscribe((res) => {
        this.bahias = res;
        // this.regForm.patchValue({

        // });
      });
  }
}
