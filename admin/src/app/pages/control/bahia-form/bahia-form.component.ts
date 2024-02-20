import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '@helpers/general-service';
import { END_POINTS } from '@helpers/general-service/utils';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { AuthService } from '../../../auth/auth.service';
import { CampusFormComponent } from '../../maintenance/campus-form/campus-form.component';

const { control, account } = END_POINTS;

@Component({
  selector: 'app-bahia-form',
  templateUrl: './bahia-form.component.html',
  styleUrls: ['./bahia-form.component.scss'],
})
export class BahiaFormComponent implements OnInit {
  @Input() data!: any;
  campus: any[] = [];
  title: string = 'Nuevo bahía';

  form: FormGroup = this.fb.group({
    _id: [''],
    name: ['', [Validators.required, Validators.maxLength(30)]],
    campus: ['', Validators.required],
    isActive: [true],
  });

  constructor(
    private dialogRef: NbDialogRef<CampusFormComponent>,
    private fb: FormBuilder,
    private generalService: GeneralService,
    private authService: AuthService,
    private toastr: NbToastrService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.title = 'Editar bahía';
      this.form.patchValue(this.data);
    }
    this.getCampus();
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
        .updateUrl$(`${control}/bay/${_id}/update`, data)
        .subscribe((res) => {
          this.toastr.success(
            `Bahia fue actualizado correctamente!`,
            `¡Éxito!`
          );
          this.dialogRef.close({ load: true });
        });
    } else {
      this.generalService
        .addData$(`${control}/bay/create`, data)
        .subscribe((res) => {
          this.toastr.success(`Bahia fue creado correctamente!`, `¡Éxito!`);
          this.dialogRef.close({ load: true });
        });
    }
  }
}
