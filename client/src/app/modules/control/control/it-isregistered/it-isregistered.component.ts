import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { RegistryService } from '../../../../services/registry.service';

@Component({
  selector: 'app-it-isregistered',
  templateUrl: './it-isregistered.component.html',
  styleUrls: ['./it-isregistered.component.scss'],
})
export class ItIsregisteredComponent implements OnInit {
  registry?: any = {};
  driver?: any = {};
  truck?: any = {};

  constructor(
    public bsModalRef: BsModalRef,
    private registryService: RegistryService,
    private toastrService: ToastrService,
    private router: Router,
    public wsService: WebsocketService
  ) {}

  ngOnInit(): void {}

  registryUpdate() {
    const formData = { arrival: new Date().toJSON(), state: 'LLEGADA' };
    this.registryService.update(this.registry._id, formData).subscribe((r) => {
      this.toastrService.success(
        'El Registro de Llegada ha sido creado correctamente!'
      );
      this.router.navigateByUrl('/control/control');
      this.arrival();
      this.bsModalRef.hide();
    });
  }

  arrival() {
    this.wsService.emit('tv-arrival');
  }

  unload() {
    this.wsService.emit('tv-unload');
  }

  load() {
    this.wsService.emit('tv-load');
  }

  getAll() {
    this.wsService.emit('tv-arrival');
    this.wsService.emit('tv-unload');
    this.wsService.emit('tv-load');
  }
}
