import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const { endpoint } = environment;

@Injectable({
  providedIn: 'root'
})
export class TvService {

  constructor(private http: HttpClient) { }

  getBays(params: any) {
    return this.http.get<any[]>(`${endpoint}/public/bays`, { params });
  }

  getTrucks(params: any) {
    return this.http.get<any[]>(`${endpoint}/public/registries`, { params });
  }

}
