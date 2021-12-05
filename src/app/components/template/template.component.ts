import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
    correo: 'konny@jojos.com'
  }

  constructor(
    private pais: PaisService
  ) { }

  ngOnInit(): void {
    this.pais.getPaises().subscribe(res => {
      console.log(res);
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
