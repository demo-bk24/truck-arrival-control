import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const { endpoint } = environment;

const controlApi = `${endpoint}/control`;
const accountApi = `${endpoint}/account`;

@Injectable({
  providedIn: 'root',
})
export class ControlService {
  constructor(private http: HttpClient) {}

  getArrivals() {
    return this.http.get(`${controlApi}/registry/arrivals`);
  }

  searchDocument(document: string) {
    return this.http.get(`${accountApi}/users?document=${document}`);
  }

  registryInitial(driver: string) {
    return this.http.get(`${controlApi}/registry/initial?driver=${driver}`);
  }

  registryUpdate(formData: any, id: string) {
    return this.http.put(`${controlApi}/registry/${id}/update`, formData);
  }

  searchPlaque(plaque: string) {
    return this.http.get(`${controlApi}/truck/search?plaque=${plaque}`);
  }

  createDriver(formData: any) {
    return this.http.post(`${accountApi}/create`, formData);
  }

  updateDriver(formData: any, id: string) {
    return this.http.put(`${accountApi}/${id}/update`, formData);
  }

  createTruck(formData: any) {
    return this.http.post(`${controlApi}/truck/create`, formData);
  }

  updateTruck(formData: any, id: string) {
    return this.http.put(`${controlApi}/truck/${id}/update`, formData);
  }

  registryControl(formData: any) {
    return this.http.post(`${controlApi}/registry/create`, formData);
  }

  authorizeEntry(formData: any, id: string) {
    return this.http.put(`${controlApi}/registry/${id}/update`, formData);
  }

  listTruckTypes() {
    return this.http.get<any[]>(`${controlApi}/truck-type/list`);
  }

  updateRegistry(id: string, data: any) {
    return this.http.put(`${controlApi}/registry/${id}/update`, data);
  }

  getUnloadTruck() {
    return this.http.get(`${controlApi}/registry/unload-truck`);
  }

  getLoadTruck() {
    return this.http.get(`${controlApi}/registry/load-truck`);
  }

  getMyLift() {
    return this.http.get(`${controlApi}/lift-operator/mylift`);
  }

  updateLift(id: string, data: any) {
    return this.http.put(`${controlApi}/lift/${id}/update`, data);
  }

  getBahias() {
    return this.http.get(`${controlApi}/bay/withregistry`);
  }

  getTrucks() {
    return this.http.get(`${controlApi}/registry/arrivals`);
  }

  getLifts() {
    return this.http.get(`${controlApi}/lift/list?isFree=true&isActive=true`);
  }

  setBayAndLift(id: string, data: any) {
    return this.http.put(`${controlApi}/registry/${id}/update`, data);
  }

  loadBahia(formData: any, id: string) {
    return this.http.put(`${controlApi}/registry/${id}/update`, formData);
  }
}
