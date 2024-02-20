import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const { endpoint } = environment;

const campus = `${endpoint}/account/campus`;
const account = `${endpoint}/account`;
const apiPublic = `${endpoint}/public`;

@Injectable({
  providedIn: 'root',
})
export class CampusService {
  constructor(private http: HttpClient) {}

  getCampus() {
    return this.http.get<any>(campus);
  }

  getCampusPublic() {
    return this.http.get<any>(`${apiPublic}/campus`);
  }

  getCampusByCode(code: string) {
    return this.http.get<any>(`${campus}/${code}`);
  }

  updateCampus(uid: any, data: any) {
    return this.http.put<any>(`${account}/${uid}/update`, data);
  }
}
