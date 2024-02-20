import { Injectable } from '@angular/core';
import { EntityDataService } from '@helpers/general-service/utils';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const { endpoint } = environment;

@Injectable({
  providedIn: 'root',
})
export class GeneralService extends EntityDataService<any> {
  endPoint = endpoint;

  public filtersList$(serviceName: any): Observable<any> {
    return this.http.get<any>(`${endpoint}/${serviceName}`);
  }

  public file$(serviceName: any): Observable<any> {
    return this.http.get<any>(`${endpoint}/${serviceName}`, {
      observe: 'body',
      responseType: 'blob' as 'json',
    });
  }

  public paramList$(serviceName: any, params: any): Observable<any> {
    return this.http.get<any>(`${endpoint}/${serviceName}`, { params });
  }

  public paramQuery$(serviceName: any, id: any): Observable<any> {
    return this.http.get<any>(`${endpoint}/${serviceName}/${id}`);
  }

  public addData$(serviceName: any, data: any): Observable<any> {
    return this.http.post<any>(`${endpoint}/${serviceName}`, data);
  }

  public deleteData$(serviceName: any, id: any): Observable<any> {
    return this.http.delete<any>(`${endpoint}/${serviceName}/${id}`);
  }

  public deleteUrl$(serviceName: any): Observable<any> {
    return this.http.delete<any>(`${endpoint}/${serviceName}`);
  }

  public updateData$(serviceName: any, id: any, data: any): Observable<any> {
    return this.http.put<any>(`${endpoint}/${serviceName}/${id}`, data);
  }

  public updateUrl$(serviceName: any, data: any): Observable<any> {
    return this.http.put<any>(`${endpoint}/${serviceName}`, data);
  }

  public updateNameData$(serviceName: any, data: any): Observable<any> {
    return this.http.put<any>(`${endpoint}/${serviceName}`, data);
  }

  // kpi

  public nameAll$(serviceName: any): Observable<any> {
    return this.http.get<any>(`${this.endPoint}/${serviceName}`);
  }

  public nameParams$(serviceName: any, params: any): Observable<any> {
    return this.http.get<any>(`${this.endPoint}/${serviceName}`, {
      params,
    });
  }
}
