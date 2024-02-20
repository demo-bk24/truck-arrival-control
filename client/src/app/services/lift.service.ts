import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { errorHandler } from './common.service';

const { endpoint } = environment;

const controlApi = `${endpoint}/control`;
const accountApi = `${endpoint}/account`;

@Injectable({
  providedIn: 'root',
})
export class LiftService {
  constructor(private http: HttpClient) {}

  getMyLift() {
    return this.http
      .get(`${controlApi}/lift-operator/mylift`)
      .pipe(catchError(errorHandler));
  }

  update(id: string, data: any) {
    return this.http
      .put(`${controlApi}/lift/${id}/update`, data)
      .pipe(catchError(errorHandler));
  }

  list() {
    return this.http
      .get(`${controlApi}/lift/list?isFree=true&isActive=true`)
      .pipe(catchError(errorHandler));
  }
}
