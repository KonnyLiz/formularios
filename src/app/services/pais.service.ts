import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(
    private http: HttpClient
  ) { }

  getPaises() {
    return this.http.get('https://restcountries.com/v3.1/lang/spa').pipe(
      map((res: any) => {
        let data: any[] = [];

        for (const pais of res) {
          data.push({
            nombre: pais['name'].common,
            codigo: pais['cca3']
          })
        }

        return data;
      })
    )
  }
}