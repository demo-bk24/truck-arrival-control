import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class EntityDataService<T> {
  abstract get endPoint(): string;

  constructor(protected http: HttpClient) {}

  public getAll$(): Observable<T> {
    return this.http.get<T>(this.endPoint);
  }

  public getWithQuery$(params: any): Observable<T> {
    return this.http.get<T>(this.endPoint, { params: params });
  }

  public getById$(id: string): Observable<T> {
    return this.http.get<T>(`${this.endPoint}/${id}`);
  }

  public add$(entity: T): Observable<T> {
    return this.http.post<T>(this.endPoint, entity);
  }

  public update$(id: string, entity: T): Observable<T> {
    return this.http.put<T>(`${this.endPoint}/${id}`, entity);
  }

  public patch$(id: string, data: any): Observable<T> {
    return this.http.patch<T>(`${this.endPoint}/${id}`, data);
  }

  public delete$(id: string): Observable<any> {
    return this.http.delete<any>(`${this.endPoint}/${id}`);
  }
}
