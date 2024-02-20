import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';
import { RegistryService } from '../../../../services/registry.service';
import { TruckService } from '../../../../services/truck.service';

@Component({
  selector: 'app-truck-form',
  templateUrl: './truck-form.component.html',
  styleUrls: ['./truck-form.component.scss'],
})
export class TruckFormComponent implements OnInit {
  // id: string = '';

  form = this.fb.group({
    _id: [''],
    plaque: ['', [Validators.required, Validators.maxLength(10)]],
    type: ['', Validators.required],
    origin: ['', [Validators.required, Validators.maxLength(60)]],
    ruc: ['', [Validators.required, Validators.maxLength(13)]],
    company: ['', [Validators.required, Validators.maxLength(100)]],
  });

  loading: boolean = false;
  typeTruck: any;
  plaque = this.fb.control('');
  truckTypes: any[] = [];
  registryId: string = '';

  constructor(
    private fb: FormBuilder,
    // private driverService: DriverService,
    private authService: AuthService,
    private truckService: TruckService,
    private registryService: RegistryService,
    private router: Router,
    private toast: ToastrService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(({ id, plaque }) => {
      this.registryId = id;
      this.searchPlaque(plaque);
    });
  }

  ngOnInit(): void {
    this.form
      .get('plaque')
      ?.valueChanges.pipe(debounceTime(700), distinctUntilChanged())
      .subscribe((res) => {
        this.searchPlaque(res);
      });

    this.truckService.listTruckTypes().subscribe((r) => {
      this.truckTypes = r;
      if (r[0]) {
        this.typeTruck = r[0];
        this.form.controls['type'].setValue(r[0]._id);
      }
    });
  }

  searchPlaque(value: string) {
    this.truckService.search(value).subscribe((res: any) => {
      if (res) {
        this.form.patchValue(res, { emitEvent: false, onlySelf: true });
      }
    });
  }

  typeSelected(typeId: string) {
    this.typeTruck = this.truckTypes.find((t) => t._id === typeId);
  }

  invalidField(field: string) {
    return this.form.get(field)?.invalid && this.form.get(field)?.touched;
  }

  onSubmitTruck() {
    this.loading = true;
    const { value } = this.form;
    if (value._id) {
      this.truckService.update(value._id, value).subscribe((res: any) => {
        this.loading = false;
        this.saveRegistry(res._id);
      });
    } else {
      delete value._id;
      this.truckService.create(value).subscribe((res: any) => {
        this.loading = false;
        this.saveRegistry(res._id);
      });
    }
  }

  saveRegistry(truck: string) {
    if (!this.registryId) {
      const formData = {
        driver: this.authService.userId,
        truck,
      };
      this.registryService.create(formData).subscribe((res: any) => {
        this.toast.success('Registro creado correctamente', 'Geníal!!!');
        this.router.navigate(['/control/driver/initial', res._id]);
      });
    }
  }
}
