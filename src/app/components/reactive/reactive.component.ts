import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidacionesService } from 'src/app/services/validaciones.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  formulario: FormGroup;


  constructor(
    private fb: FormBuilder,
    private validaciones: ValidacionesService
  ) {
    this.formulario = this.crearFormularo();
    this.cargarFormulario();
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

  get pasatiempos() {
    // obtenemos un arreglo de elementos para el html
    return this.formulario.get('pasatiempos') as FormArray;
  }

  crearFormularo() {
    return this.fb.group({
      // son deficiones de controles
      // van todos los campos, el primero con el valor por defecto
      // y el resto son las validaciones
      // las validaciones son las que se hacen antes de enviar el form

      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, this.validaciones.noAmaya]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],

      // definimos un conjunto de propiedades para direccion
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required],
      }),

      // definimos un nuevo arreglo 
      // lo minimo es un arreglo vacio
      pasatiempos: this.fb.array([[], []])
    });
  }

  cargarFormulario() {
    // cuando se carfa un form debe de haber una estructura modelo exacta 
    // para pasarle el objeto, si no habra que agregar campos vacios para que no de error

    // para evitar el problema anterior, podemos usar reset en lugar de setvalue
    //  el reset simplemente ignorara los campos que no existen

    // this.formulario.setValue({
    this.formulario.reset({
      nombre: 'Konny',
      apellido: 'Amaya'
    });

    // cargando de valores el array
    // lo recorremos con un foeach y le asignamos el nombre al valor, creando un control
    ['comer', 'ver anime'].forEach(valor => this.pasatiempos.push(this.fb.control(valor)));
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

    // despues de guardar los datos, hay que hacer un reset de info del form
    this.formulario.reset({
      nombre: 'alguno'
    });
  }

  addPasatiempo() {
    this.pasatiempos.push(this.fb.control('', Validators.required))
  }

  deletePasatiempo(i: number) {
    // borramos el pasatiempo segun el indice
    this.pasatiempos.removeAt(i);
  }

}
