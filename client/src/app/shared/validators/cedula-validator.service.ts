import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, map, of, switchMap, tap, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModalConfirmComponent } from '../modules/modal-confirm/modal-confirm.component';

const { endpoint } = environment;

@Injectable({
  providedIn: 'root',
})
export class CedulaValidatorService {
  bsModalRef?: BsModalRef;

  constructor(private http: HttpClient, private modalService: BsModalService) {}

  validate() {
    return (control: AbstractControl) => {
      if (control.pristine) {
        return of(null);
      }
      return timer(500).pipe(
        switchMap(() => {
          return this.validateCedula(control.value);
        }),
        map((user) => {
          if (user) {
            this.openModalConfirm(user);
            return { documentAlreadyExists: true };
          } else {
            return null;
          }
        })
      );
    };
  }

  validateCedula(document: any): Observable<any> {
    return this.http.get(`${endpoint}/auth/exist-user?document=${document}`);
  }

  openModalConfirm(user?: any) {
    this.bsModalRef = this.modalService.show(
      ModalConfirmComponent,
      this.itIsRegistered(user)
    );
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  itIsRegistered(user?: any) {
    const { firstName, lastName } = user;
    return {
      class: 'modal-dialog-centered',
      initialState: {
        title: '¡Ya está registrado!',
        color: 'text-danger',
        colorIcon: 'text-warning',
        message: `Sr. ${firstName} ${lastName}, usted ya esta registrado en el sistema de colas "WMS".Proceda a iniciar sesión o registrarse desde el control.`,
        icon: 'exclamation-triangle',
        iconBtn: 'arrow-alt-circle-right',
        link: '/auth/login',
        textBtn: 'Iniciar sesión',
      },
    };
  }
}
