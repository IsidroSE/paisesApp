import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})
export class PorPaisComponent {

  hayError: boolean = false;
  paises: Country[] = [];

  constructor( private paisService: PaisService ) { }

  buscar(termino: string) {
    this.hayError = false;

    this.paisService.buscarPais(termino).subscribe(
      (paises) => {
        console.log(paises);
        this.paises = paises;
      }, (err) => {
        console.log(err);
        this.hayError = true;
        this.paises = [];
      }
    )
  }

  sugerencias( termino: string) {
    console.log(termino);
    this.hayError = false;
    // TODO: Crear sugerencias
  }

}
