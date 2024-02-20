import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { errorHandler } from './common.service';

const { endpoint } = environment;

const truckApi = `${endpoint}/control/truck`;

@Injectable({
  providedIn: 'root',
})
export class TruckService {
  constructor(private http: HttpClient) {}

  search(plaque: string) {
    return this.http
      .get(`${truckApi}/search?plaque=${plaque}`)
      .pipe(catchError(errorHandler));
  }

  create(formData: any) {
    return this.http
      .post(`${truckApi}/create`, formData)
      .pipe(catchError(errorHandler));
  }

  update(id: string, formData: any) {
    return this.http
      .put(`${truckApi}/${id}/update`, formData)
      .pipe(catchError(errorHandler));
  }

  listTruckTypes() {
    return this.http
      .get<any[]>(`${endpoint}/control/truck-type/list`)
      .pipe(catchError(errorHandler));
  }

  retrieve(id: string) {
    return this.http
      .get<any>(`${truckApi}/${id}/retrieve`)
      .pipe(catchError(errorHandler));
  }
}
