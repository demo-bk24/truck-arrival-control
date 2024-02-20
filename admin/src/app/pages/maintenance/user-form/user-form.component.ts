import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '@helpers/general-service';
import { END_POINTS } from '@helpers/general-service/utils';
import { NbToastrService } from '@nebular/theme';
import { AuthService } from 'src/app/auth/auth.service';

const { account } = END_POINTS;

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  campus: any[] = [];
  title: string = 'Nuevo usuario';

  form: FormGroup = this.fb.group({
    uid: [''],
    firstName: ['', [Validators.required, Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.maxLength(60)]],
    campus: ['', [Validators.required]],
    document: ['', [Validators.required, Validators.maxLength(15)]],
    licence: ['', [Validators.maxLength(12)]],
    category: ['', [Validators.maxLength(12)]],
    isDriver: [false],
    isControl: [false],
    isOperator: [false],
    isAssistant: [false],
    isSorter: [false],
    isPicking: [false],
    isActive: [true],
    isAdmin: [false],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
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
    const { campus } = this.authService.user;
    this.form.get('campus')?.patchValue(campus);
  }

  ngOnInit(): void {
    this.getCampus();
  }

  get(id: string) {
    this.title = 'Editar usuario';
    this.generalService
      .filtersList$(`${account}/${id}/retrieve`)
      .subscribe((res) => {
        this.form.patchValue(res);
      });
  }

  getCampus() {
    this.generalService
      .filtersList$(`${account}/campus`)
      .subscribe((res) => (this.campus = res));
  }

  submit() {
    const { uid, ...data } = this.form.value;
    if (uid) {
      this.generalService
        .updateUrl$(`${account}/${uid}/update`, data)
        .subscribe(() => {
          this.toastr.success(
            `Usuario fue actualizado correctamente!`,
            `¡Éxito!`
          );
          this.router.navigateByUrl('/pages/mantenimiento/usuarios');
        });
    } else {
      this.generalService.addData$(`${account}/create`, data).subscribe(() => {
        this.toastr.success(`Usuario fue creado correctamente!`, `¡Éxito!`);
        this.router.navigateByUrl('/pages/mantenimiento/usuarios');
      });
    }
  }
}
