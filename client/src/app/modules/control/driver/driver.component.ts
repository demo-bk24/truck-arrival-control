import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegistryService } from '../../../services/registry.service';
import { WebsocketService } from '../../../shared/services/websocket.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss'],
})
export class DriverComponent implements OnInit {
  registry: any;
  today = new Date();
  suscription$!: Subscription;

  constructor(
    private registryService: RegistryService,
    private wsService: WebsocketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.wsService.emit('hello');
    this.suscription$ = this.wsService
      .listen('hello2')
      .subscribe(() => this.getForNow());
  }

  ngOnDestroy(): void {
    this.suscription$.unsubscribe();
  }

  getForNow() {
    this.registryService.getForNow().subscribe((res: any) => {
      this.registry = res;
      if (!res) {
        this.router.navigateByUrl('/control/driver/truck-form');
      }
      if (res && !res.arrival) {
        this.router.navigateByUrl(`/control/driver/initial/${res._id}`);
      }
    });
  }
}
