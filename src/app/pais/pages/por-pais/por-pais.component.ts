import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
    li {
      cursor: pointer;
    }
  `]
})
export class PorPaisComponent {

  hayError: boolean = false;
  paises: Country[] = [];
  termino: string = '';
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor( private paisService: PaisService ) { }

  buscar(termino: string) {
    this.hayError = false;

    if (!termino) return;

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

  sugerencias( termino: string ) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    if (!termino) {
      this.paisesSugeridos = [];
      return;
    }
    
    this.paisService.buscarPais(termino).subscribe(
      paises => this.paisesSugeridos = paises.splice(0, 5)
    );
  }

  buscarSugerido( termino: string ) {
    this.buscar(termino);
    this.mostrarSugerencias = false;
  }

}
