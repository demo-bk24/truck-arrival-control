import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalMethodsService {
  constructor() {}

  padTo2Digits(num: any) {
    return num.toString().padStart(2, '0');
  }

  convertMsToTime(milliseconds: number) {
    let seconds = Math.floor(milliseconds / 1000) || 0;
    let minutes = Math.floor(seconds / 60) || 0;
    let hours = Math.floor(minutes / 60) || 0;
    seconds = seconds % 60;
    minutes = minutes % 60;
    return `${this.padTo2Digits(hours)}:${this.padTo2Digits(
      minutes
    )}:${this.padTo2Digits(seconds)}`;
  }

  convertMsToHM(milliseconds: number) {
    let seconds = Math.floor(milliseconds / 1000) || 0;
    let minutes = Math.floor(seconds / 60) || 0;
    let hours = Math.floor(minutes / 60) || 0;
    seconds = seconds % 60;
    minutes = seconds >= 30 ? minutes + 1 : minutes;
    minutes = minutes % 60;
    return `${this.padTo2Digits(hours)}:${this.padTo2Digits(minutes)}`;
  }

  convertMsToTimeByItem(item: any) {
    const start = new Date(item.startTime).getTime();
    const end = new Date(item.endTime).getTime();
    const milliseconds = end - start;
    return this.convertMsToTime(milliseconds);
  }

  convertMsToHMByItem(item: any) {
    const start = new Date(item.startTime).getTime();
    const end = new Date(item.endTime).getTime();
    const milliseconds = end - start;
    return this.convertMsToHM(milliseconds);
  }

  convertMinutesToMs(minutes: number) {
    return minutes * 60 * 1000;
  }

  convertMstoHours(milliseconds: number) {
    // return only hours
    return Math.floor(milliseconds / 1000 / 60 / 60);
  }
}
