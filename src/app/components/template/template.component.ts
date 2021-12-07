import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisModel } from 'src/app/models/pais.model';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: 'Konny',
    apellido: 'Amaya',
    correo: 'konny@jojos.com',

    // le damos valor por defecto al select con el value
    pais: 'SLV',
    genero: 'F'
  }

  paises: PaisModel[] = [];

  constructor(
    private pais: PaisService
  ) { }

  ngOnInit(): void {
    this.pais.getPaises().subscribe(res => {
      this.paises = res;

      // con esto le damos un valor por defecto al select
      this.paises.unshift({
        nombre: '[Seleccione pais]',
        codigo: ''
      });
      console.log(this.paises);
    });
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach(res => {
        res.markAllAsTouched();
      })
    }
    console.log(form.value);
  }

}
