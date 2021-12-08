import { Injectable } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesService {

  constructor() { }

  // si se cumple la condicion, regresamos un objeto
  noAmaya(control: FormControl) {
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
      const pass1Control = forma.controls[pass1];
      const pass2Control = forma.controls[pass2];

      if (pass2Control.value === pass1Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noIgualPass1: true });
      }
    }
  }
}
