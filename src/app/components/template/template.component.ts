import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

  guardar(form: NgForm){
    console.log(form.value);
  }

}
