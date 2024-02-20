import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BsModalRef,
  BsModalService,
  ModalDirective,
} from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { RegistryService } from 'src/app/services/registry.service';
import { TruckService } from 'src/app/services/truck.service';
import { UserService } from 'src/app/services/user.service';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { ItIsregisteredComponent } from '../it-isregistered/it-isregistered.component';

@Component({
  selector: 'app-registry-form',
  templateUrl: './registry-form.component.html',
  styleUrls: ['./registry-form.component.scss'],
})
export class RegistryFormComponent implements OnInit {
  loading = false;
  typeTruck: any;
  idDriver: string = '';
  idTruck: string = '';
  truckTypes: any[] = [];
  message: any = {};

  modalRef?: BsModalRef;
  bsModalRef?: BsModalRef;
  @ViewChild('template', { static: false }) template?: ModalDirective;

  driverForm: FormGroup = this.fb.group({
    document: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^[0-9]*$'),
      ],
    ],
    firstName: ['', [Validators.required, Validators.maxLength(40)]],
    lastName: ['', [Validators.required, Validators.maxLength(50)]],
    licence: ['', [Validators.required, Validators.maxLength(10)]],
    category: ['', [Validators.required, Validators.maxLength(8)]],
    isDriver: [true],
  });

  truckForm: FormGroup = this.fb.group({
    plaque: ['', [Validators.required, Validators.maxLength(10)]],
    type: ['', Validators.required],
    origin: ['', [Validators.required, Validators.maxLength(60)]],
    ruc: ['', [Validators.required, Validators.maxLength(13)]],
    company: ['', [Validators.required, Validators.maxLength(100)]],
  });

  constructor(
    private fb: FormBuilder,
    // private ctrlService: ControlService,
    private registryService: RegistryService,
    private truckService: TruckService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private modalService: BsModalService,
    public wsService: WebsocketService
  ) {
    this.route.params.subscribe(({ dni }) => {
      this.searchDocument(dni);
      this.driverForm.get('document')?.setValue(dni);
    });
  }

  ngOnInit(): void {
    this.truckService.listTruckTypes().subscribe((r) => {
      this.truckTypes = r;
      if (r[0]) {
        this.typeTruck = r[0];
        this.truckForm.controls['type'].setValue(r[0]._id);
      }
    });

    this.driverForm
      .get('document')
      ?.valueChanges.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((res) => {
        this.searchDocument(res);
      });

    this.truckForm
      .get('plaque')
      ?.valueChanges.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((res) => this.searchPlaque(res.trim().toUpperCase()));
  }

  invalidTruckField(field: string) {
    return (
      this.truckForm.get(field)?.invalid && this.truckForm.get(field)?.touched
    );
  }

  invalidDriverField(field: string) {
    return (
      this.driverForm.get(field)?.invalid && this.driverForm.get(field)?.touched
    );
  }

  searchDocument(document: string) {
    this.userService.search(document).subscribe((res: any) => {
      this.idDriver = '';
      if (res.results.length > 0) {
        this.driverForm.patchValue(res.results[0], {
          emitEvent: false,
          onlySelf: true,
        });
        this.idDriver = res.results[0].uid;
        this.registryInitial(res.results[0].uid);
      }
    });
  }

  registryInitial(uid: string) {
    this.registryService.getInitial(uid).subscribe((res) => {
      if (res) {
        this.openModalRegistry(res);
      }
    });
  }

  searchPlaque(value: string) {
    this.truckService.search(value).subscribe((res: any) => {
      this.idTruck = '';
      if (res) {
        this.truckForm.patchValue(res, { emitEvent: false, onlySelf: true });
        this.idTruck = res._id;
      }
    });
  }

  register() {
    if (this.driverForm.invalid) return;
    if (this.truckForm.invalid) return;
    this.saveDriver();
  }

  typeSelected(typeId: string) {
    this.typeTruck = this.truckTypes.find((t) => t._id === typeId);
  }

  saveDriver() {
    this.loading = true;
    if (this.idDriver) {
      this.userService
        .update(this.idDriver, this.driverForm.value)
        .subscribe((res: any) => {
          this.saveTruck(res);
        });
    } else {
      this.userService.create(this.driverForm.value).subscribe((res: any) => {
        this.saveTruck(res);
      });
    }
  }

  saveTruck(driver: string) {
    if (this.idTruck) {
      this.truckService
        .update(this.idTruck, this.truckForm.value)
        .subscribe((res: any) => {
          this.registerArrival(driver, res);
        });
    } else {
      this.truckService.create(this.truckForm.value).subscribe((res: any) => {
        this.registerArrival(driver, res);
      });
    }
  }

  registerArrival(driver: any, truck: any) {
    const formData = {
      driver: driver.uid,
      truck: truck._id,
      arrival: new Date().toJSON(),
      state: 'LLEGADA',
      origin: truck.origin,
      ruc: truck.ruc,
      company: truck.company,
    };
    this.registryService.create(formData).subscribe((res) => {
      this.toast.success(
        'El registro de llegada ha sido creada',
        'Excelente!!!'
      );
      this.wsService.emit('hello');
      this.wsService.emit('work-lift');
      this.loading = false;
      (this.message = { ...driver, ...truck, ...res }), this.template?.show();
      setTimeout(() => {
        this.template?.hide();
        this.router.navigateByUrl('/control/control/arrival');
      }, 3000);
      // this.emitSocket();
    });
  }

  navigate() {
    this.router.navigateByUrl('/control/control/arrival');
  }

  openModalRegistry(registered: any) {
    this.bsModalRef = this.modalService.show(
      ItIsregisteredComponent,
      this.isRegistered(registered)
    );
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  isRegistered(registered: any) {
    const { driver, truck } = registered;
    return {
      class: 'modal-sm modal-dialog-centered',
      keyboard: false,
      ignoreBackdropClick: true,
      initialState: {
        driver,
        truck,
        registry: registered,
      },
    };
  }
}
