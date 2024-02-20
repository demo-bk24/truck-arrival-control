import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { errorHandler } from './common.service';

const { endpoint } = environment;

const controlApi = `${endpoint}/control`;

@Injectable({
  providedIn: 'root',
})
export class BayService {
  constructor(private http: HttpClient) {}

  getBays() {
    return this.http
      .get(`${controlApi}/bay/withregistry`)
      .pipe(catchError(errorHandler));
  }

  list() {
    return this.http
      .get(`${controlApi}/bay/list?isFree=true&isActive=true`)
      .pipe(catchError(errorHandler));
  }
}
