import { Component } from '@angular/core';

import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
    button {
      margin-right: 5px;
      margin-top: 5px;
    }
    `
  ]
})
export class PorRegionComponent {

  regiones: string[] = ['EU','EFTA','CARICOM','PA','AU','USAN','EEU','AL','ASEAN','CAIS','CEFTA','NAFTA','SAARC'];
  regionActiva: string = ''; 
  hayError: boolean = false;
  paises: Country[] = [];
  
  constructor( private paisService: PaisService ) { }

  getClaseCSS (region: string ): string {
    return (region === this.regionActiva) ? 'btn-primary' : 'btn-outline-primary';
  }

  activarRegion ( region: string ) {
    this.regionActiva = region;
    this.buscar(region);
  }

  private buscar(termino: string) {
    this.hayError = false;

    this.paisService.buscarRegion(termino).subscribe(
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



}
