import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  spinner: Subject<boolean> = new Subject();

  constructor() {}

  onSpinner() {
    this.spinner.next(true);
  }

  ofSpinner() {
    this.spinner.next(false);
  }

  getStatusSpinner(): Observable<boolean> {
    return this.spinner.asObservable();
  }
}
