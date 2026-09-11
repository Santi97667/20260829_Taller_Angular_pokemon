import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgStyle } from '@angular/common';
import { PokemonStorageService, PokemonTarjeta } from '../../services/pokemon-storage.service';
import { ResaltarTarjeta } from '../../directives/resaltar-tarjeta.directive';

@Component({
  imports: [FormsModule, NgClass, NgStyle, ResaltarTarjeta],
  standalone: true,
  selector: 'app-buscador-pokemon',
  styleUrl: './buscador-pokemon.component.css',
  templateUrl: './buscador-pokemon.component.html',
})
export class BuscadorPokemonComponent {

  pokemonService = inject(PokemonStorageService);

  nombrePokemonInput = signal('');
  pokemon = signal<PokemonTarjeta | null>(null);
  mensajeError = signal<string | null>(null);
  cargando = signal(false);

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.nombrePokemonInput.set(input.value);
  }

  async buscarPokemon() {
    const nombrePokemon = this.nombrePokemonInput().trim().toLowerCase();

    if (!nombrePokemon) return;

    this.mensajeError.set(null);
    this.cargando.set(true);

    this.pokemonService.buscarEnAPI(nombrePokemon).subscribe({
      next: (res: any) => {
        this.pokemon.set({
          id: res.id,
          name: res.name.toLowerCase(),
          image: res.sprites.front_default,
          type: res.types[0].type.name,
          base_experience: res.base_experience,
          esFavorito: false
        });

        this.cargando.set(false);
      },
      error: () => {
        this.pokemon.set(null);
        this.mensajeError.set('Ojito, Pokémon no encontrado');
        this.cargando.set(false);
      }
    });
  }

  guardarEnEquipo() {
    const poke = this.pokemon();

    if (poke) {
      this.pokemonService.guardarpokemon(poke);
      alert(`${poke.name} agregado al almacenamiento exitosamente`);
      this.pokemon.set(null);
      this.nombrePokemonInput.set('');
    }
  }
}

