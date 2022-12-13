import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon';
import { Trainer } from '../models/trainer';
import { Attack } from '../models/attack';

@Injectable({
  providedIn: 'root'
})
export class ObtainDataService {

  private readonly apiUrl1 = environment.url1;

  allAttacks!: Attack[];

  constructor(private http: HttpClient) { }

  getTrainers(){
    return this.http.get<Trainer[]>(`${this.apiUrl1}`);
  }

  getTrainersNames(): Observable<Array<string>>{
    return this.http.get<Trainer[]>(`${this.apiUrl1}`).pipe(
      map((entrenadores: Trainer[]) => {
        return entrenadores.map((entrenador: Trainer) => entrenador.fullName);
      })
    );
  }

  getPokemonsOfATrainer(nombreEntrenador: string): Observable<Array<Pokemon[]>> {
    return this.http.get<Trainer[]>(`${this.apiUrl1}?fullName=${nombreEntrenador}`).pipe(
      map((entrenadores: Trainer[]) => {
        return entrenadores.map((entrenador: Trainer) => entrenador.pokemons);
      })
    );
  }

  getAttacksOfAPokemon(nombreEntrenador: string): Observable<Array<Attack>> {
    return this.http.get<Trainer[]>(`${this.apiUrl1}?fullName=${nombreEntrenador}`).pipe(
      map((entrenadores: Trainer[]) => {
        // Create an array to hold the attacks[] arrays for each Pokemon
        const allAttacks: Attack[] = [];
        // Use forEach() to iterate over each trainer in the entrenadores array
        entrenadores.forEach((entrenador: Trainer) => {
          // Use forEach() to iterate over each Pokemon in the trainer's team
          entrenador.pokemons.forEach((pokemon: Pokemon) => {
            // Add the attacks[] array for each Pokemon to the allAttacks array
            allAttacks.push(...pokemon.attacks);
          });
        });
        // Return the allAttacks array once all trainers and Pokemon have been processed
        return allAttacks;
      })
    );
  }
}
