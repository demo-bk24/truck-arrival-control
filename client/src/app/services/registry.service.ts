import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { errorHandler } from './common.service';

const { endpoint } = environment;
const registryApi = `${endpoint}/control/registry`;

@Injectable({
  providedIn: 'root',
})
export class RegistryService {
  constructor(private http: HttpClient) {}

  getArrivals(): Observable<any[]> {
    return this.http
      .get<any[]>(`${registryApi}/arrivals`)
      .pipe(catchError(errorHandler));
  }

  create(formData: any) {
    return this.http
      .post(`${registryApi}/create`, formData)
      .pipe(catchError(errorHandler));
  }

  getInitial(driver: string) {
    return this.http
      .get(`${registryApi}/initial?driver=${driver}`)
      .pipe(catchError(errorHandler));
  }

  update(id: string, formData: any) {
    return this.http
      .put(`${registryApi}/${id}/update`, formData)
      .pipe(catchError(errorHandler));
  }

  getUnloadTruck() {
    return this.http
      .get(`${registryApi}/unload-truck`)
      .pipe(catchError(errorHandler));
  }

  getLoadTruck() {
    return this.http
      .get(`${registryApi}/load-truck`)
      .pipe(catchError(errorHandler));
  }

  getForNow() {
    return this.http.get(`${registryApi}/fornow`);
  }

  retrieve(id: string) {
    return this.http.get(`${registryApi}/${id}/retrieve`);
  }

  // authorizeEntry(formData: any,id: string) {
  //   return this.http.put(`${registryApi}/${id}/update`, formData);
  // }

  // getTrucks() {
  //   return this.http.get(`${registryApi}/arrivals`);
  // }

  // setBayAndLift(id: string, data: any) {
  //   return this.http.put(`${registryApi}/${id}/update`, data)
  // }

  // loadBahia(formData: any,id: string) {
  //   return this.http.put(`${registryApi}/${id}/update`, formData)
  // }
}
// export interface Bay {
//   _id?: string;
//   name: string;
//   type: string;
//   isActive:boolean;
// }
