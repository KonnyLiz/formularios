import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

// los corchetes indican que pueden haber varias claves: valor bool
interface ErrorValidacion {
  [s: string]: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidacionesService {

  constructor() { }

  // si se cumple la condicion, regresamos un objeto
  noAmaya(control: FormControl): ErrorValidacion | null {
    if (control.value?.toLowerCase() === 'amaya') {
      return {
        noAmaya: true
      };
    } else {
      return null;
    }
  }

  passIguales(pass1: string, pass2: string) {
    return (forma: FormGroup) => {

      let pass1Control = forma.controls[pass1];
      let pass2Control = forma.controls[pass2];

      if (pass2Control.value === pass1Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noIgualPass1: true });
      }
    }
  }

  usuarioExiste(control: FormControl): Promise<ErrorValidacion> | null {
    // si es una peticion http, es conveniente que manejemos el error
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (control.value === 'kon') {
          return { existeUsuario: true };
        } else {
          return null;
        }
      }, 3500);
    });
  }


}
