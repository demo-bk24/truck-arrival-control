import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { errorHandler } from './common.service';

const { endpoint } = environment;

const accountApi = `${endpoint}/account`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  search(document: string) {
    return this.http
      .get(`${accountApi}/users?document=${document}`)
      .pipe(catchError(errorHandler));
  }

  create(formData: any) {
    // default role => driver
    return this.http
      .post(`${accountApi}/create`, formData)
      .pipe(catchError(errorHandler));
  }

  update(id: string, formData: any) {
    return this.http
      .put(`${accountApi}/${id}/update`, formData)
      .pipe(catchError(errorHandler));
  }

  retrieve(id: string) {
    return this.http
      .get(`${accountApi}/${id}/retrieve`)
      .pipe(catchError(errorHandler));
  }
}
