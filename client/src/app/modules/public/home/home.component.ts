import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { CampusService } from '../../../services/campus.service';
import { GlobalMethodsService } from '../../../services/global-methods.service';
import { TruckTypeService } from '../../../services/truck-type.service';
import { TvService } from '../services/tv.service';
import { CampusModalComponent } from './campus-modal/campus-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  today = new Date();
  bays: any[] = [];
  trucks: any[] = [];

  bsModalRef?: BsModalRef;
  campus: any;
  currentSede: any;
  sede: any;

  constructor(
    private tvAPI: TvService,
    public wsService: WebsocketService,
    private modalService: BsModalService,
    private campusService: CampusService,
    private gm: GlobalMethodsService,
    private truckTypeService: TruckTypeService
  ) {}

  ngOnInit(): void {
    this.verifyCampus();
    this.loadBays();
    this.wsService.listen('hello2').subscribe((r) => this.loadBays());
  }

  getCampus() {
    this.campusService.getCampusPublic().subscribe((res: any) => {
      this.campus = res;
      this.sede = this.campus.find((c: any) => c.code === this.currentSede);
    });
  }

  verifyCampus() {
    this.getCampus();
    if (!localStorage.getItem('campus')) {
      this.openModalWithComponent();
    } else {
      this.currentSede = localStorage.getItem('campus');
    }
  }

  openModalWithComponent() {
    this.sede = '';
    this.bays = [];
    this.trucks = [];
    const initialState: ModalOptions = {
      class: 'modal-dialog-centered modal-md',
      keyboard: false,
      backdrop: 'static',
      initialState: {},
    };
    this.modalService.show(CampusModalComponent, initialState);
    this.modalService.onHide.subscribe((res) => {
      this.verifyCampus();
      this.loadBays();
    });
  }

  loadBays() {
    const params = {
      campus: this.currentSede,
    };
    this.tvAPI.getBays(params).subscribe((r) => {
      this.loadTrucks();
      this.bays = r.map((bay) => {
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
      this.bays.map((item: any) => {
        this.getTimeByTrucktypeForBay(item);
        this.calculateTimeForBay(item);
      });
      // console.log(this.bays);
      const interval = setInterval(() => {
        // console.log('interval-ttttttttt');
        this.bays.map((item: any) => {
          this.getTimeByTrucktypeForBay(item);
          this.calculateTimeForBay(item);
        });
        if (this.bays.every((item: any) => item.isFree)) {
          clearInterval(interval);
        }
      }, 250);
    });
  }

  loadTrucks() {
    const params = {
      campus: this.currentSede,
    };
    this.tvAPI.getTrucks(params).subscribe((r) => {
      this.trucks = r;
      this.trucks.map((item: any) => {
        this.getTotalTime(item);
      });
      const interval = setInterval(() => {
        // console.log('interval');
        this.trucks.map((item: any) => {
          this.getTotalTime(item);
        });
        if (
          this.trucks.every(
            (item: any) =>
              item.state === 'CARGADO' ||
              item.state === 'DESCARGADO' ||
              item.state === 'SALIDA'
          )
        ) {
          clearInterval(interval);
        }
      }, 500);
      // console.log(this.trucks);
    });
  }

  // diff(lastDate: string, startDate: string) {
  //   const diff = new Date(lastDate).valueOf() - new Date(startDate).valueOf();
  //   const hours =
  //     Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) || 0;
  //   const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)) || 0;
  //   // if (!lastDate || !startDate) return ''
  //   // const last = new Date(lastDate);
  //   // const start = new Date(startDate);
  //   // const difHour = start.getHours() - last.getHours()
  //   // const difMin = start.getMinutes() - last.getMinutes()
  //   // const minPos =this.toPositive(difMin)
  //   // const difMinText = minPos<10?'0'+minPos:minPos;
  //   // return difHour + ':' + difMinText;
  //   return `${hours}:${minutes}`;
  // }

  diff(lastDate: string, startDate: string) {
    const start = new Date(startDate).getTime();
    const last = new Date(lastDate).getTime();
    const gap = last - start;
    const currentTime = this.gm.convertMsToHM(gap);
    return currentTime;
  }

  getTotalTime(truck: any) {
    const arrival = new Date(truck.arrival).getTime() || 0;
    const checkIn =
      truck.state === 'LLEGADA'
        ? new Date().getTime()
        : new Date(truck.checkInTime).getTime() || 0;
    const unloadStart = new Date(truck.unloadStartTime).getTime() || 0;
    const unloadEnd =
      truck.state === 'DESCARGANDO'
        ? new Date().getTime()
        : new Date(truck.unloadEndTime).getTime() || 0;
    const loadStart = new Date(truck.loadStartTime).getTime() || 0;
    const loadEnd =
      truck.state === 'CARGANDO'
        ? new Date().getTime()
        : new Date(truck.loadEndTime).getTime() || 0;
    const arrivalGap = checkIn - arrival;
    const unloadGap = unloadEnd - unloadStart;
    const loadGap = loadEnd - loadStart;
    truck.arrivalTime = this.gm.convertMsToHM(arrivalGap) || '00:00';
    truck.unloadTime = this.gm.convertMsToHM(unloadGap) || '00:00';
    truck.loadTime = this.gm.convertMsToHM(loadGap) || '00:00';
    truck.total = arrivalGap + unloadGap + loadGap || 0;
    return this.gm.convertMsToHM(truck.total) || '00:00:00';
  }

  // private toPositive = (num:number) => num<0 ? num * -1: num

  // getTimeByTrucktype(arrival: any) {
  //   this.truckTypeService
  //     .publicRetrieve(arrival.truck.type)
  //     .subscribe((res: any) => {
  //       arrival.timeUnload = res.maxTimeUnload;
  //       arrival.timeLoad = res.maxTimeLoad;
  //       this.convertHoursToMs(arrival);
  //     });
  // }

  getTimeByTrucktypeForBay(bay: any) {
    if (bay.registry) {
      this.truckTypeService
        .publicRetrieve(bay.registry.truck.type)
        .subscribe((res: any) => {
          bay.registry.timeUnload = res.maxTimeUnload;
          bay.registry.timeLoad = res.maxTimeLoad;
          this.convertHoursToMsForBay(bay);
        });
    }
  }

  // calculateTime(arrival: any) {
  //   const unloadStart = new Date(arrival.unloadStartTime).getTime();
  //   const unloadEnd =
  //     new Date(arrival.unloadEndTime).getTime() || new Date().getTime();
  //   const loadStart = new Date(arrival.loadStartTime).getTime();
  //   const loadEnd =
  //     new Date(arrival.loadEndTime).getTime() || new Date().getTime();
  //   arrival.unloadGap = unloadEnd - unloadStart || 0;
  //   arrival.loadGap = loadEnd - loadStart || 0;
  //   arrival.currentUnloadTime = this.gm.convertMsToTime(arrival.unloadGap);
  //   arrival.currentLoadTime = this.gm.convertMsToTime(arrival.loadGap);
  // }

  calculateTimeForBay(bay: any) {
    if (bay.registry) {
      const unloadStart = new Date(bay.registry.unloadStartTime).getTime();
      const unloadEnd =
        new Date(bay.registry.unloadEndTime).getTime() || new Date().getTime();
      const loadStart = new Date(bay.registry.loadStartTime).getTime();
      const loadEnd =
        new Date(bay.registry.loadEndTime).getTime() || new Date().getTime();
      bay.registry.unloadGap = unloadEnd - unloadStart || 0;
      bay.registry.loadGap = loadEnd - loadStart || 0;
      bay.registry.currentUnloadTime = this.gm.convertMsToTime(
        bay.registry.unloadGap
      );
      bay.registry.currentLoadTime = this.gm.convertMsToTime(
        bay.registry.loadGap
      );
    }
  }

  // convertHoursToMs(arrival: any) {
  //   if (!arrival.timeUnload) {
  //     arrival.msTimeUnload = 0;
  //   } else if (!arrival.timeLoad) {
  //     arrival.msTimeLoad = 0;
  //   }
  //   arrival.msTimeLoad = this.gm.convertMinutesToMs(arrival.timeLoad);
  //   arrival.msTimeLoadGreen = Math.round((90 / 100) * arrival.msTimeLoad);
  //   arrival.msTimeUnload = this.gm.convertMinutesToMs(arrival.timeUnload);
  //   arrival.msTimeUnloadGreen = Math.round((90 / 100) * arrival.msTimeUnload);
  // }

  convertHoursToMsForBay(bay: any) {
    if (bay.registry) {
      if (!bay.registry.timeUnload) {
        bay.registry.msTimeUnload = 0;
      } else if (!bay.registry.timeLoad) {
        bay.registry.msTimeLoad = 0;
      }
      bay.registry.msTimeLoad = this.gm.convertMinutesToMs(
        bay.registry.timeLoad
      );
      bay.registry.msTimeLoadGreen = Math.round(
        (90 / 100) * bay.registry.msTimeLoad
      );
      bay.registry.msTimeUnload = this.gm.convertMinutesToMs(
        bay.registry.timeUnload
      );
      bay.registry.msTimeUnloadGreen = Math.round(
        (90 / 100) * bay.registry.msTimeUnload
      );
    }
  }

  // colorize(arrival: any) {
  //   if (arrival.state === 'CARGANDO') {
  //     if (arrival.loadGap > 0 && arrival.loadGap < arrival.msTimeLoadGreen) {
  //       return { 'background-color': '#c9f1c6', color: '#000' };
  //     } else if (
  //       arrival.loadGap >= arrival.msTimeLoadGreen &&
  //       arrival.loadGap < arrival.msTimeLoad
  //     ) {
  //       return { 'background-color': '#f2f2b1', color: '#000' };
  //     } else if (arrival.loadGap >= arrival.msTimeLoad) {
  //       return { 'background-color': '#ffb3c8', color: '#000' };
  //     } else {
  //       return { 'background-color': '#fff', color: '#000' };
  //     }
  //   } else if (arrival.state === 'DESCARGANDO') {
  //     if (
  //       arrival.unloadGap > 0 &&
  //       arrival.unloadGap < arrival.msTimeUnloadGreen
  //     ) {
  //       return { 'background-color': '#c9f1c6', color: '#000' };
  //     } else if (
  //       arrival.unloadGap >= arrival.msTimeUnloadGreen &&
  //       arrival.unloadGap < arrival.msTimeUnload
  //     ) {
  //       return { 'background-color': '#f2f2b1', color: '#000' };
  //     } else if (arrival.unloadGap >= arrival.msTimeUnload) {
  //       return { 'background-color': '#ffb3c8', color: '#000' };
  //     } else {
  //       return { 'background-color': '#fff', color: '#000' };
  //     }
  //   } else {
  //     return { 'background-color': '#fff', color: '#000' };
  //   }
  // }

  colorize(truck: any) {
    const metaControl = this.gm.convertMinutesToMs(
      this.sede.goalControl ? this.sede.goalControl : 0
    );
    const metaControlGreen = Math.round((90 / 100) * metaControl);
    const { total } = truck;
    if (total > 0 && total < metaControlGreen) {
      return { 'background-color': '#c9f1c6', color: '#000' };
    } else if (total >= metaControlGreen && total < metaControl) {
      return { 'background-color': '#f2f2b1', color: '#000' };
    } else if (total >= metaControl) {
      return { 'background-color': '#ffb3c8', color: '#000' };
    } else {
      return { 'background-color': '#fff', color: '#000' };
    }
  }

  colorizeForBay(bay: any) {
    if (bay.registry && bay.registry.state === 'CARGANDO') {
      if (
        bay.registry.loadGap > 0 &&
        bay.registry.loadGap < bay.registry.msTimeLoadGreen
      ) {
        return { 'background-color': '#c9f1c6', color: '#000' };
      } else if (
        bay.registry.loadGap >= bay.registry.msTimeLoadGreen &&
        bay.registry.loadGap < bay.registry.msTimeLoad
      ) {
        return { 'background-color': '#f2f2b1', color: '#000' };
      } else if (bay.registry.loadGap >= bay.registry.msTimeLoad) {
        return { 'background-color': '#ffb3c8', color: '#000' };
      } else {
        return { 'background-color': '#fff', color: '#000' };
      }
    } else if (bay.registry && bay.registry.state === 'DESCARGANDO') {
      if (
        bay.registry.unloadGap > 0 &&
        bay.registry.unloadGap < bay.registry.msTimeUnloadGreen
      ) {
        return { 'background-color': '#c9f1c6', color: '#000' };
      } else if (
        bay.registry.unloadGap >= bay.registry.msTimeUnloadGreen &&
        bay.registry.unloadGap < bay.registry.msTimeUnload
      ) {
        return { 'background-color': '#f2f2b1', color: '#000' };
      } else if (bay.registry.unloadGap >= bay.registry.msTimeUnload) {
        return { 'background-color': '#ffb3c8', color: '#000' };
      } else {
        return { 'background-color': '#fff', color: '#000' };
      }
    } else {
      return { 'background-color': '#fff', color: '#000' };
    }
  }
}
