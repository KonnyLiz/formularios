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

  campoInvalido(campo: string) {
    return this.formulario.get(campo)?.invalid && this.formulario.get(campo)?.touched;
  }

  get pasatiempos() {
    // obtenemos un arreglo de elementos para el html
    return this.formulario.get('pasatiempos') as FormArray;
  }

  get pass2Invalido(){
    const pass1 = this.formulario.get('pass1')?.value;
    const pass2 = this.formulario.get('pass2')?.value;

    return (pass1 === pass2 )? false : true;
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
      pass1: ['', Validators.required],
      pass2: [''],

      // definimos un conjunto de propiedades para direccion
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required],
      }, {
        // hacemos validaciones ya cuando el form esta construido
        validators: this.validaciones.passIguales('pass1', 'pass2')
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
