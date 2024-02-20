import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '@helpers/general-service';
import { END_POINTS } from '@helpers/general-service/utils';
import { NbDialogRef, NbToastrService } from '@nebular/theme';

const { account } = END_POINTS;

@Component({
  selector: 'app-campus-form',
  templateUrl: './campus-form.component.html',
  styleUrls: ['./campus-form.component.scss'],
})
export class CampusFormComponent implements OnInit {
  @Input() data!: any;
  title: string = 'Nueva Sede';

  loading: boolean = false;
  isValid: boolean = false;

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    code: [
      '',
      [Validators.required, Validators.maxLength(4), Validators.minLength(4)],
    ],
    goalSorting: [315, Validators.required],
    goalPicking: [215, Validators.required],
    goalControl: [59, Validators.required],
    region: [''],
    _id: [],
  });

  constructor(
    private dialogRef: NbDialogRef<CampusFormComponent>,
    private fb: FormBuilder,
    private generalService: GeneralService,
    private toastr: NbToastrService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue(this.data);
      this.title = 'Editar Sede';
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

  submit() {
    const { _id, ...data } = this.form.value;
    if (_id) {
      this.generalService
        .updateUrl$(`${account}/${_id}/campus/update`, data)
        .subscribe(() => {
          this.toastr.success(`Sede fue actualizado correctamente!`, `¡Éxito!`);
          this.dialogRef.close({ load: true });
        });
    } else {
      this.generalService
        .addData$(`${account}/campus/create`, data)
        .subscribe(() => {
          this.toastr.success(`Sede fue creado correctamente!`, `¡Éxito!`);
          this.dialogRef.close({ load: true });
        });
    }
  }
}
