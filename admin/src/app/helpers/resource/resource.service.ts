import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResult, Resource, ResourceMap } from './resource';
import { RESOURCE_TOKEN } from './resource.module';

export class ResourceHttp<T> implements Resource<T> {
  protected _resourceUrl: string;

  constructor(protected resourceUrl: string, protected http: HttpClient) {
    this._resourceUrl = resourceUrl;
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this._resourceUrl);
  }

  paginate(query: any): Observable<PaginatedResult<T>> {
    const params = new HttpParams(query);
    return this.http.get<PaginatedResult<T>>(this._resourceUrl, { params });
  }

  filter(query: any): Observable<T[]> {
    const params = new HttpParams(query);
    return this.http.get<T[]>(this._resourceUrl, { params });
  }

  getById(id: string | number): Observable<T> {
    return this.http.get<T>(`${this._resourceUrl}/${id}`);
  }

  create(data: T): Observable<T> {
    return this.http.post<T>(this._resourceUrl, data);
  }

  update(id: string | number, data: T): Observable<T> {
    return this.http.put<T>(`${this._resourceUrl}/${id}`, data);
  }

  delete(id: string | number): Observable<string | number> {
    return this.http.delete<string | number>(`${this._resourceUrl}/${id}`);
  }
}

@Injectable()
export class ResourceService {
  protected resources: { [name: string]: Resource<any> } = {};
  constructor(
    @Inject(RESOURCE_TOKEN)
    protected _config: ResourceMap,
    protected _http: HttpClient
  ) {}

  getResource<T>(name: string): Resource<T> {
    if (!this._config.hasOwnProperty(name)) {
      throw new TypeError('Resource Name Error');
    }
    name = name.trim();
    let service = this.resources[name];
    if (!service) {
      service = new ResourceHttp<T>(this._config[name], this._http);
      this.resources[name] = service;
    }
    return service;
  }
}
