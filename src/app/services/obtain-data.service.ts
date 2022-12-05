import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon';
import { Trainer } from '../models/trainer';

@Injectable({
  providedIn: 'root'
})
export class ObtainDataService {

  private readonly apiUrl1 = environment.url1;

  constructor(private http: HttpClient) { }

  getTrainers(){
    return this.http.get<Trainer[]>(`${this.apiUrl1}`);
  }

  getPokemonsOfATrainer(nombreEntrenador: string){
    return this.http.get<Trainer>(`${this.apiUrl1}?nombre=${nombreEntrenador}`)
    .pipe(map((entrenador: Trainer) => { 
        const pokeContainer : Pokemon[] = entrenador.pokemons;
        return pokeContainer;
      })
    );
  }
}
