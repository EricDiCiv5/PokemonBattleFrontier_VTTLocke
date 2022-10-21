import { Pokemon } from "./pokemon";

export interface Trainer {
    fullName: string;
    pokemons: Pokemon[];
}
