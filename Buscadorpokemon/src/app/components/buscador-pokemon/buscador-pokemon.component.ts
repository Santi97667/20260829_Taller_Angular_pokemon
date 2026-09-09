import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms'

interface PokemonData {
  name: string;
  image: string;
  type: string;
}


@Component({
  imports: [FormsModule],
  standalone: true,
  selector: 'app-buscador-pokemon',
  styleUrl: './buscador-pokemon.component.css',
  templateUrl: './buscador-pokemon.component.html',
})


export class BuscadorPokemonComponent {
  nombrePokemonInput = signal('');
  pokemon = signal<PokemonData | null>(null);
  mensajeError = signal<string | null>(null);
  buscando = signal(false);

  async buscarPokemon() {

    const nombrePokemon = this.nombrePokemonInput().trim().toLowerCase();
  	
    if(!nombrePokemon) return;

    this.mensajeError.set(null);
    this.buscando.set(true);

    try {
      const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`);

      if(!respuesta.ok){
        throw new Error('¡No se encontró el Pokemon!');
      }

      const datos = await respuesta.json();

      this.pokemon.set({
        name: datos.name.toUpperCase(),
        image: datos.sprites.front_default,
        type: datos.types.map((typeInfo: any) => typeInfo.type.name).join(', ')
      });

    } catch (error: any) {
      this.pokemon.set(null);
      this.mensajeError.set(error.message);
    } finally {
      this.buscando.set(false);
    }

  }
}
