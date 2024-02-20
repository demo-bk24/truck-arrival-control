import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '@helpers/general-service';
import { END_POINTS } from '@helpers/general-service/utils';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { AuthService } from 'src/app/auth/auth.service';

const { account, control } = END_POINTS;

@Component({
  selector: 'app-lifttruck-form',
  templateUrl: './lifttruck-form.component.html',
  styleUrls: ['./lifttruck-form.component.scss'],
})
export class LifttruckFormComponent implements OnInit {
  @Input() data: any;
  campus: any[] = [];
  title: string = 'Nuevo montacarga';

  form: FormGroup = this.fb.group({
    _id: [''],
    name: ['', [Validators.required, Validators.maxLength(30)]],
    campus: ['', Validators.required],
    isFree: [false],
  });

  constructor(
    private dialogRef: NbDialogRef<LifttruckFormComponent>,
    private fb: FormBuilder,
    private generalService: GeneralService,
    private authService: AuthService,
    private toastr: NbToastrService
  ) {}

  ngOnInit(): void {
    this.getCampus();

    if (this.data) {
      this.title = 'Editar montacarga';
      this.form.patchValue(this.data);
    }
  }

  getCampus() {
    this.generalService.filtersList$(`${account}/campus`).subscribe((res) => {
      this.campus = res;
      this.form.get('campus')?.patchValue(this.authService.user.campus);
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  submit() {
    const { _id, ...data } = this.form.value;
    if (_id) {
      this.generalService
        .updateUrl$(`${control}/lift/${_id}/update`, data)
        .subscribe((res) => {
          this.toastr.success(
            `Montacarga fue actualizado correctamente!`,
            `¡Éxito!`
          );
          this.dialogRef.close({ load: true });
        });
    } else {
      this.generalService
        .addData$(`${control}/lift/create`, data)
        .subscribe((res) => {
          this.toastr.success(
            `Montacarga fue creado correctamente!`,
            `¡Éxito!`
          );
          this.dialogRef.close({ load: true });
        });
    }
  }
}
