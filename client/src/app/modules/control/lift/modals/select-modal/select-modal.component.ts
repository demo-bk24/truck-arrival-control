import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BayService } from '../../../../../services/bay.service';
import { LiftService } from '../../../../../services/lift.service';

@Component({
  selector: 'app-select-modal',
  templateUrl: './select-modal.component.html',
  styleUrls: ['./select-modal.component.scss'],
})
export class SelectModalComponent implements OnInit {
  bahias: any = [];
  formBays: any[] = [];
  lifts: any = [];

  loadBay: FormControl = this.fb.control('', Validators.required);
  // loadLift: FormControl = this.fb.control('', Validators.required);

  constructor(
    private liftService: LiftService,
    private bayService: BayService,
    private fb: FormBuilder,
    private bsModal: BsModalRef
  ) {}

  ngOnInit(): void {
    this.loadBays();
  }

  loadBays() {
    this.bayService.getBays().subscribe((res: any) => {
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

      this.formBays = res.filter((item: any) => item.isFree) || [];
    });
  }

  private loadLifts() {
    this.liftService.list().subscribe((res: any) => (this.lifts = res));
  }

  setBahia(bahia: any) {
    localStorage.setItem('bahia', JSON.stringify(bahia.value));
    this.bsModal.hide();
    // this.verifySelect();
  }

  // setLift(lift: any) {
  //   localStorage.setItem('lift', JSON.stringify(lift.value));
  //   this.verifySelect();
  // }

  // verifySelect() {
  //   console.log(this.loadBay.value);
  //   if(this.loadBay.valid){
  //     this.bsModal.hide();
  //   }
  // }
}
