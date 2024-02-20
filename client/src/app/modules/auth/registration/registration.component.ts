import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ModalConfirmComponent } from 'src/app/shared/modules/modal-confirm/modal-confirm.component';
import { CedulaValidatorService } from 'src/app/shared/validators/cedula-validator.service';
import { AuthService } from '../../../services/auth.service';
import { CampusService } from '../../../services/campus.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  bsModalRef?: BsModalRef;
  loading: boolean = false;
  campus: any[] = [];

  form: FormGroup = this.fb.group({
    document: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^[0-9]*$'),
      ],
      [this.cedulaValidator.validate()],
    ],
    firstName: ['', [Validators.required, Validators.maxLength(40)]],
    lastName: ['', [Validators.required, Validators.maxLength(50)]],
    licence: ['', [Validators.required, Validators.maxLength(10)]],
    category: ['', [Validators.required, Validators.maxLength(8)]],
    campus: ['', [Validators.required]],
    isDriver: [true],
  });

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private cedulaValidator: CedulaValidatorService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private campusService: CampusService
  ) {}

  ngOnInit(): void {
    this.getCampus();
  }

  getCampus() {
    this.campusService.getCampusPublic().subscribe((res: any) => {
      this.campus = res;
    });
  }

  openModalConfirm(user: any) {
    this.bsModalRef = this.modalService.show(
      ModalConfirmComponent,
      this.isRegistered(user)
    );
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  isRegistered(user: any) {
    const { firstName, lastName, username, password } = user;
    return {
      class: 'modal-dialog-centered',
      keyboard: false,
      ignoreBackdropClick: true,
      initialState: {
        title: '¡¡¡Registro exitoso!!!',
        color: 'text-success',
        colorIcon: 'text-success',
        message: `Bienvenido Sr. ${firstName} ${lastName}, sea registrado correctamente en el sistema de colas "WMS".
          \n Usuario: ${username}
          \n Contraseña: ${password}`,
        icon: 'check',
        iconBtn: 'arrow-alt-circle-right',
        link: '/auth/login',
        textBtn: 'Adelante',
      },
    };
  }

  get documentErrorMsg(): string {
    const errors: any = this.form.get('document')?.errors;
    if (errors?.required) {
      return 'Dni es requerido';
    } else if (errors.documentAlreadyExists) {
      return 'Ya existe usuario con ese documento';
    } else if (errors?.minlength) {
      return 'DNI debe tener al menos 8 caracteres';
    } else if (errors?.pattern) {
      return 'Solo se acepta números';
    }
    return '';
  }

  invalidField(field: string) {
    return this.form.get(field)?.invalid && this.form.get(field)?.touched;
  }

  register() {
    if (this.form.invalid) return;
    this.loading = true;
    this.authService.register(this.form.value).subscribe(
      (user) => {
        this.openModalConfirm(user);
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.toastrService.error(error.error.error, 'Error');
      }
    );
  }
}
