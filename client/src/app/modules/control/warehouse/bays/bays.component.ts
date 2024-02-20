import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { BayService } from 'src/app/services/bay.service';
import { LiftService } from 'src/app/services/lift.service';
import { RegistryService } from 'src/app/services/registry.service';
import { WebsocketService } from 'src/app/shared/services/websocket.service';

@Component({
  selector: 'app-bays',
  templateUrl: './bays.component.html',
  styleUrls: ['./bays.component.scss'],
})
export class BaysComponent implements OnInit {
  date = Date.now();
  bahias: any = [];
  sending = false;
  trucks: any = [];
  lifts: any = [];
  modalRef?: BsModalRef;
  registry: any;
  suscription$!: Subscription;

  formBays: any[] = [];

  unloadForm = this.fb.group({
    unloadBay: ['', Validators.required],
    unloadLift: ['', Validators.required],
  });

  loadForm = this.fb.group({
    loadBay: ['', Validators.required],
    loadLift: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    public modalService: BsModalService,
    private registryService: RegistryService,
    private bayService: BayService,
    private liftService: LiftService,
    public wsService: WebsocketService
  ) {}

  ngOnInit(): void {
    this.wsService.emit('hello');
    this.suscription$ = this.wsService
      .listen('hello2')
      .subscribe(() => this.loadBays());
  }

  onSubmitUnload() {
    this.sending = true;
    const data = this.unloadForm.getRawValue();
    data['state'] = 'DESCARGA';
    // console.log(data);
    this.registryService.update(this.registry._id, data).subscribe((res) => {
      this.loadArrivalTrucks();
      this.modalRef?.hide();
      this.toast.success('Se asignó la bahía y el montacarga correctamente!!!');
      this.updateLift(data.unloadLift, { isFree: false });
      this.sending = false;
      this.wsService.emit('hello');
      this.wsService.emit('work-lift');
    });
  }

  ngOnDestroy(): void {
    this.suscription$.unsubscribe();
  }

  onSubmitLoad() {
    this.sending = true;
    const data = this.loadForm.getRawValue();
    data['state'] = 'CARGA'; // setBayAndLift
    // console.log(data);
    this.registryService.update(this.registry._id, data).subscribe((res) => {
      this.loadArrivalTrucks();
      this.updateLift(data.loadLift, { isFree: false });
      this.toast.success('Se asignó la bahía y el montacarga correctamente!!!');
      this.modalRef?.hide();
      this.sending = false;
      this.wsService.emit('hello');
      this.wsService.emit('work-lift');
    });
  }

  setUnloadBay(template: TemplateRef<any>, truck: any) {
    this.registry = truck;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    });
  }

  setLoadBay(template: TemplateRef<any>, truck: any) {
    this.registry = truck;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    });
  }

  loadBays() {
    this.bayService.getBays().subscribe((res: any) => {
      this.loadArrivalTrucks();
      this.loadLifts();
      this.bahias = res.map((bay: any) => {
        bay.isFree = bay.unload ? false : true;
        if (bay.unload && bay.unload.state === 'DESCARGADO') {
          bay.isFree = true;
        }
        if (bay.isFree) {
          bay.isFree = bay.load ? false : true;
          if (bay.load && bay.load.state === 'CARGADO') {
            bay.isFree = true;
          }
        }
        if (!bay.isFree) {
          if (bay.unload) {
            bay.registry = bay.unload;
            bay.startTime = bay.unload.unloadStartTime;
          } else {
            bay.registry = bay.load;
            bay.startTime = bay.load.loadStartTime;
          }
          bay.registry.lift = bay.unload?.unloadLift
            ? bay.unload.unloadLift
            : bay.load.loadLift;
        }
        return bay;
      });

      this.formBays = res.filter((item: any) => item.isFree);
    });
  }

  loadArrivalTrucks() {
    this.registryService.getArrivals().subscribe((res: any) => {
      this.trucks = res.filter((reg: any) => reg.state !== 'SALIDA');
    });
  }

  private loadLifts() {
    this.liftService.list().subscribe((res: any) => (this.lifts = res));
  }

  private updateLift(id: string, data: any) {
    this.liftService.update(id, data).subscribe((res: any) => this.loadLifts());
  }
}
