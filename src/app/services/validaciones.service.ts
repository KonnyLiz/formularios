import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

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
}
