import { Injectable, inject, signal } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface PokemonTarjeta{
  id : number;
  name : string;
  image : string;
  type : string;

  base_experience : number;
  esFavorito : boolean;
}
@Injectable({
  providedIn: 'root'
})
export class PokemonStorageService {

  private http = inject(HttpClient);
  private readonly storage_key = 'equipo_pokemon_registrado';
 
  misPokemons = signal<PokemonTarjeta[]>([]);

  constructor() {
    this.cargarDesdeStorage();
  }

  private cargarDesdeStorage() {
    const data = localStorage.getItem(this.storage_key);
    if (data) {
      this.misPokemons.set(JSON.parse(data));
    }
  }
}
