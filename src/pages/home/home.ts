import { Component } from '@angular/core';

import { ANIMALES } from './../../data/data.animales';
import { Animal } from './../../interfaces/animal.interface';
import {Refresher} from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  animales: Animal[] = [];
  audio = new Audio();
  audioTiempo: any;

  constructor() {
    this.animales = ANIMALES.slice(0); //clonamos el objeto de referencia para no sobreescribirlo
    
  }

  reproducir( animal: Animal ){
    console.log(animal);
    // let audio = new Audio();

    this.pausar_audio(animal);
    if(animal.reproduciendo){
      animal.reproduciendo = false;
      return;
    }

    this.audio.src = animal.audio;
    this.audio.load();
    this.audio.play();
  
    this.audioTiempo = setTimeout(()=> animal.reproduciendo = false, animal.duracion * 1000)

    animal.reproduciendo = true;
  }

  private pausar_audio( animalSel: Animal){
    clearTimeout( this.audioTiempo );
    this.audio.pause();
    this.audio.currentTime = 0;

    for( let animal of this.animales ){
      if( animal.nombre != animalSel.nombre ){

      }
    }

  }

  borrarAnimal(idx:number){
    this.animales.splice(idx, 1);
  }


  /**
   * @description Función en documentación oficial,
   * recarga y actualiza la lista de animales
   * 
   * @param {*} refresher 
   * @memberof HomePage
   */
  recargarAnimales( refresher: Refresher ) {
    console.log('inicio del refresh');
    setTimeout(()=>{
      console.log('termino el refresh');
       this.animales = ANIMALES.slice(0);

       refresher.complete();
    }, 1500);
  }

}
