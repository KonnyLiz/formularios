import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  formulario: FormGroup;


  constructor(
    private fb: FormBuilder
  ) {
    this.formulario = this.crearFormularo();
  }

  ngOnInit(): void {
  }

  get nombreInvalido() {
    return this.formulario.get('nombre')?.invalid && this.formulario.get('nombre')?.touched;
  }

  get apellidoInvalido() {
    return this.formulario.get('apellido')?.invalid && this.formulario.get('apellido')?.touched;
  }

  get correoInvalido() {
    return this.formulario.get('correo')?.invalid && this.formulario.get('correo')?.touched;
  }

  get distritoInvalido() {
    return this.formulario.get('direccion.distrito')?.invalid && this.formulario.get('direccion.distrito')?.touched;
  }

  get ciudadInvalido() {
    return this.formulario.get('direccion.ciudad')?.invalid && this.formulario.get('direccion.ciudad')?.touched;
  }

  crearFormularo() {
    return this.fb.group({
      // son deficiones de controles
      // van todos los campos, el primero con el valor por defecto
      // y el resto son las validaciones
      // las validaciones son las que se hacen antes de enviar el form

      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, Validators.minLength(5)]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required]
      })
    });
  }

  guardar() {
    if (this.formulario.invalid) {
      return Object.values(this.formulario.controls).forEach(cntl => {
        // para el formgroup hay que hacer uno propio para ellos
        if (cntl instanceof FormGroup) {
          Object.values(cntl.controls).forEach(c => c.markAsTouched());
        } else {
          cntl.markAsTouched();
        }

      });
    }
  }

}
