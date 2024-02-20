import { Injectable } from '@angular/core';
import { debounceTime, delay, Observable, shareReplay, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  protected layoutSize$: any = new Subject();
  protected layoutSizeChange$ = this.layoutSize$.pipe(
    shareReplay({ refCount: true })
  );

  changeLayoutSize() {
    this.layoutSize$.next();
  }

  onChangeLayoutSize(): Observable<any> {
    return this.layoutSizeChange$.pipe(delay(1));
  }

  onSafeChangeLayoutSize(): Observable<any> {
    return this.layoutSizeChange$.pipe(debounceTime(350));
  }
}
