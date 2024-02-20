import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

export const errorHandler = (error: HttpErrorResponse) =>
  throwError(() => error);

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  //  constructor() { }
  /**
   *
   * @param title string
   * @param message string
   * @param callback function
   */

  public showConfirmSave(title: string, message: string, callback: any) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Guardar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then((result) => callback(result));
  }

  public showConfirm(title: string, message: string, callback: any) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      // cancelButtonColor: '#3085d6'
    }).then((result) => callback(result));
  }

  public showConfirmStart(title: string, message: string, callback: any) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      confirmButtonColor: '#bb2d3b',
      confirmButtonText: 'Empezar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      // cancelButtonColor: '#3085d6'
    }).then((result) => callback(result));
  }

  public showConfirmEnd(title: string, message: string, callback: any) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      confirmButtonColor: '#bb2d3b',
      confirmButtonText: 'Finalizar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      // cancelButtonColor: '#3085d6'
    }).then((result) => callback(result));
  }

  /**
   * @param message string
   * @param icono string; ex: success, error, warning; default: success
   */
  public showToast(message: string, icono: any = 'success') {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: icono,
      title: message,
    });
  }
}
