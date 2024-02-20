import { Observable } from 'rxjs';

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    pageSizes: number;
    lastPage: number;
  };
}

export interface Resource<T> {
  getAll(): Observable<T[]>;

  paginate(query: any): Observable<PaginatedResult<T>>;

  filter(query: any): Observable<T[]>;

  getById(id: string | number): Observable<T>;

  create(data: T): Observable<T>;

  update(id: string | number, data: T): Observable<T>;

  delete(id: string | number): Observable<string | number>;
}

export interface ResourceMap {
  [name: string]: string;
}
