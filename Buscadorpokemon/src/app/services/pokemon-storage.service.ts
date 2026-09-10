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
  // -1  obtener datos de la API
  buscarEnAPI(nombreOid : string){
     return this.http<>('https://pokeapi.co/api/v2/pokemon/${nombrePokemon}');
     }
     // -2 guardar/crear nuevo pokemon dentro del maleto.
     guardarpokemon(nuevo:PokemonTarjeta){
       const actualizados=[ ...this.misPokemons(),nuevo];
       this.misPokemons.set(actualizados);
       localStorage.setItem(this.storage_key,JSON.stringify(actualizados))


     }

     // -3 Actualizar pokemon Favorito.
     actualizarFavorito(id: nombre){
     const actualizados = this.misPokemons().map(poke =>{
       if (poke.id === id){
        return{...poke,esFavorito?:poke.Favorito}
       }
       return poke;
     });
     this.misPokemons.set(actualizados)
     localStorage.setItem(this.storage_key,JSON.stringify(actualizados))

     }

     // 4 Eliminar pokemon del maleto.

     eliminarpokemon(id: number){
      const filtrados = this.misPokemons().filter(poke => poke.id ! == id);
      this.misPokemons.set(filtrados);
        localStorage.setItem(this.storage_key,JSON.stringify(actualizados))

     }
     };
  


