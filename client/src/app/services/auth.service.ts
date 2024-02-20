import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const { endpoint } = environment;
const authApi = `${endpoint}/auth`;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user!: any;

  constructor(private http: HttpClient, private router: Router) {}

  get user() {
    return { ...this._user };
  }

  get userId() {
    return this._user.uid;
  }

  get getFullName() {
    return `${this._user.firstName} ${this._user.lastName}`;
  }

  register(formData: any): Observable<any> {
    return this.http.post(`${authApi}/register`, formData);
  }

  login(formData: any) {
    return this.http.post<any>(`${authApi}/login`, formData).pipe(
      tap((res) => {
        if (res) localStorage.setItem('access_token', res.token!);
      })
    );
  }

  validateToken(): Observable<boolean> {
    return this.http.get<any>(`${authApi}/renew`).pipe(
      map((res) => {
        localStorage.setItem('access_token', res.token!);
        this._user = res.user;
        this.setRole(res.user);
        return true;
      }),
      catchError((err) => {
        return of(false);
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('bahia');
    this.router.navigateByUrl('/auth');
  }

  setRole(user: any) {
    const {
      isDriver,
      isControl,
      isAssistant,
      isOperator,
      isSorter,
      isPicking,
    } = user;
    if (isDriver) {
      this.saveRoute('control/driver');
    } else if (isControl) {
      this.saveRoute('control/control');
    } else if (isAssistant) {
      this.saveRoute('control/warehouse');
    } else if (isOperator) {
      this.saveRoute('control/lift');
    } else if (isSorter) {
      this.saveRoute('sorting/form');
    } else if (isPicking) {
      this.saveRoute('picking/enlistment');
    }
  }

  saveRoute(route: string) {
    localStorage.setItem('route', route);
  }
}
