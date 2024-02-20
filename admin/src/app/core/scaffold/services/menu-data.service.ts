import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuDataService {
  constructor(private http: HttpClient) {}

  menu() {
    return this.http.get('../../assets/json/menu.json');
  }
}
