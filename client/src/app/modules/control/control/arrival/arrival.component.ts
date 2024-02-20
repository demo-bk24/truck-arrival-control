import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RegistryService } from 'src/app/services/registry.service';
import { WebsocketService } from '../../../../shared/services/websocket.service';

@Component({
  selector: 'app-arrival',
  templateUrl: './arrival.component.html',
  styleUrls: ['./arrival.component.scss'],
})
export class ArrivalComponent implements OnInit {
  registry: any;
  byCedule = '';
  modalRef: any;
  arrivals: any = [];
  sending = false;
  obsForm = this.fb.group({ observation: ['', [Validators.maxLength(300)]] });

  document = this.fb.control('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  found: boolean = false;
  date: any = Date.now();
  idCheckInControl: string = '';

  suscription$!: Subscription;

  constructor(
    private modalService: BsModalService,
    private registryService: RegistryService,
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastrService,
    private authService: AuthService,
    public wsService: WebsocketService
  ) {
    this.idCheckInControl = this.authService.userId;
  }

  ngOnInit(): void {
    this.wsService.emit('hello');
    this.suscription$ = this.wsService
      .listen('hello2')
      .subscribe(() => this.getArrivals());
    this.document.valueChanges.subscribe((value) => {
      this.found = this.arrivals.some(
        (data: any) => data.driver.document === value && data.state != 'SALIDA'
      );
    });
  }

  ngOnDestroy(): void {
    this.suscription$.unsubscribe();
  }

  getArrivals() {
    this.registryService.getArrivals().subscribe((res: any) => {
      this.arrivals = res.map((item: any) => {
        item.alert = false;
        item.state =
          item.state === 'DESCARGANDO' ? 'DESCARGANDO...' : item.state;
        item.state = item.state === 'CARGANDO' ? 'CARGANDO...' : item.state;
        if (item.unloadBay && !item.checkInTime) {
          item.alert = true;
        }
        if (item.loadBay && !item.checkInTime) {
          item.alert = true;
        }
        return item;
      });
      // this.arrivals = list.sort((a: any, b: any) => a.arrivalTime < b.arrivalTime);
    });
  }

  filtered() {
    return this.arrivals.filter((reg: any) => {
      return (
        reg.driver.document
          .toLowerCase()
          .indexOf(this.byCedule.toLowerCase()) !== -1
      );
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    });
  }

  closeModal() {
    this.modalRef?.hide();
    this.document.reset('');
  }

  navigate() {
    this.toast.info('Ingrese los datos del conductor y del vehículo');
    this.router.navigate([
      '/control/control/registry-form',
      this.document.value,
    ]);
    this.closeModal();
  }

  confirmModal(template: TemplateRef<any>, reg: any) {
    this.registry = reg;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  // Autorizar ingreso
  saveCheckIn() {
    this.modalRef.hide();
    const data = {
      checkInTime: new Date().toJSON(),
      checkInControl: this.idCheckInControl,
    };
    this.registryService.update(this.registry._id, data).subscribe((res) => {
      this.wsService.emit('hello');
      this.wsService.emit('work-lift');
    });
  }

  openConfirmModal(template: TemplateRef<any>, d: any) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
    this.registry = d;
  }

  saveExit() {
    this.registryService
      .update(this.registry._id, { state: 'SALIDA', exit: new Date().toJSON() })
      .subscribe((r) => {
        this.toast.success('Registro de salida guardado correctamente');
        this.modalRef.hide();
        this.wsService.emit('hello');
        this.wsService.emit('work-lift');
      });
  }

  openObsFormModal(template: TemplateRef<any>, d: any) {
    this.obsForm.reset();
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    });
    this.registry = d;
    this.obsForm.patchValue(d);
  }

  saveObs() {
    this.sending = true;
    this.registryService
      .update(this.registry._id, this.obsForm.value)
      .subscribe((r: any) => {
        this.toast.success('Observación guardado correctamente');
        this.modalRef.hide();
        this.registry.observation = r.observation;
        this.sending = false;
      });
  }

  public get f() {
    return this.obsForm.controls;
  }
  public validClass(field: string) {
    return {
      'is-valid': this.f[field].touched && this.f[field].valid,
      'is-invalid': this.f[field].touched && this.f[field].invalid,
    };
  }
}
