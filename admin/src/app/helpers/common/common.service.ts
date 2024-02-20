import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

export const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  /**
   * @param title string
   * @param message string
   * @param callback function
   */

  public showConfirm(title: string, message: string, callback: any) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      background: 'var(--slide-out-background)',
      color: 'var(--text-basic-color)',
      confirmButtonColor: 'var(--button-filled-primary-background-color)',
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: 'var(--button-filled-danger-background-color)',
    }).then((result) => callback(result));
  }
}
