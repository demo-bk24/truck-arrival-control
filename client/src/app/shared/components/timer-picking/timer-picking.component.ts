import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-timer-picking',
  templateUrl: './timer-picking.component.html',
  styleUrls: ['./timer-picking.component.scss'],
})
export class TimerPickingComponent implements OnChanges, OnDestroy {
  clock: any;
  hours: any = '00';
  minutes: any = '00';
  seconds: any = '00';
  milliseconds: any = '00';
  progress = 0;
  typeProg: any;

  @Input() start: boolean;
  @Input() action = '';
  @Input() showTimerControls!: boolean;
  @Input() startTime!: string;
  @Input() maxMin = 0;

  constructor() {
    this.start = true;
    this.typeProg = 'success';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      (changes['start'] && changes['start'].currentValue && typeof this.minutes === 'number',
      typeof this.seconds === 'number',
      typeof this.milliseconds === 'number')
    ) {
      this.startTimer();
    } else {
      this.clearTimer();
      this.startTimer();
    }
  }

  laps: any = [];
  counter!: any;
  timerRef: any;
  running: boolean = false;
  startText = 'Empezar';

  setProgress(minute: number, hour: number) {
    if (hour > 0) minute = minute + 60 * hour;
    this.progress = Math.floor((minute * 100) / this.maxMin);
    if (this.progress > 50) this.typeProg = 'info';
    if (this.progress > 75) this.typeProg = 'warning';
    if (this.progress > 92) this.typeProg = 'danger';
  }

  startTimer() {
    this.running = !this.running;
    if (this.running) {
      this.startText = 'Stop';
      const startTime = new Date(this.startTime).valueOf() - (this.counter || 0);
      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime;
        this.hours = Math.floor((this.counter % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((this.counter % (1000 * 60 * 60)) / (1000 * 60));
        this.setProgress(this.minutes, this.hours);
        this.seconds = Math.floor((this.counter % (1000 * 60)) / 1000);
        if (Number(this.minutes) < 10) {
          this.minutes = '0' + this.minutes;
        } else {
          this.minutes = '' + this.minutes;
        }
        if (Number(this.milliseconds) < 10) {
          this.milliseconds = '0' + this.milliseconds;
        } else {
          this.milliseconds = '' + this.milliseconds;
        }
        if (Number(this.seconds) < 10) {
          this.seconds = '0' + this.seconds;
        } else {
          this.seconds = '' + this.seconds;
        }
      });
    } else {
      this.startText = 'Resume';
      clearInterval(this.timerRef);
    }
  }

  lapTimeSplit() {
    let lapTime = this.minutes + ':' + this.seconds + ':' + this.milliseconds;
    this.laps.push(lapTime);
  }

  clearTimer() {
    this.running = false;
    this.startText = 'Empezar';
    this.counter = undefined;
    (this.milliseconds = '00'), (this.seconds = '00'), (this.minutes = '00');
    this.hours = '00';
    this.laps = [];
    clearInterval(this.timerRef);
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }
}
