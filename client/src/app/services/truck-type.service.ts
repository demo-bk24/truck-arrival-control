import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { errorHandler } from './common.service';

const { endpoint } = environment;

const truckTypeApi = `${endpoint}/control/truck-type`;

@Injectable({
  providedIn: 'root',
})
export class TruckTypeService {
  constructor(private http: HttpClient) {}

  list(params: any) {
    return this.http.get<any>(`${truckTypeApi}/list`, { params });
  }

  retrieve(type: string) {
    return this.http
      .get<any>(`${truckTypeApi}/${type}/retrieveByType`)
      .pipe(catchError(errorHandler));
  }

  publicRetrieve(type: string) {
    return this.http
      .get<any>(`${endpoint}/public/truck-type/${type}/retrieveByType`)
      .pipe(catchError(errorHandler));
  }
}
