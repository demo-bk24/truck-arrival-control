import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsocketService } from 'src/app/shared/services/websocket.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TvComponent implements OnInit, OnDestroy {

  arrivalSubscription$!: Subscription;
  unloadSubscription$!: Subscription;
  loadSubscription$!: Subscription;
  arrivalTrucks: any = [];
  trucksUnload: any = [];
  loadTrucks: any = [];

  constructor(
    public wsService: WebsocketService
  ) { }


  ngOnInit(): void {
    this.arrivalSubscription$ = this.getArrivalTrucks();
    this.unloadSubscription$ = this.getTruckUnload();
    this.loadSubscription$ = this.getLoadTrucks();
    this.getData();
  }

  getArrivalTrucks() {
    return this.wsService.listen('arrival-trucks').subscribe(res => {
      // console.log('LLegada de camiones',res);
      this.arrivalTrucks = res;
    });
  }

  getTruckUnload() {
    return this.wsService.listen('unload-trucks').subscribe(res => {
      // console.log('Descarga de camiones',res);
      this.trucksUnload = res;
    });
  }

  getLoadTrucks() {
    return this.wsService.listen('load-trucks').subscribe(res => {
      // console.log('carga de camiones',res);
      this.loadTrucks = res;
    });
  }

  getData() {
    this.wsService.emit('tv-arrival');
    this.wsService.emit('tv-unload');
    this.wsService.emit('tv-load');
  }

  ngOnDestroy(): void {
    this.arrivalSubscription$.unsubscribe();
    this.unloadSubscription$.unsubscribe();
    this.loadSubscription$.unsubscribe();
  }
}
