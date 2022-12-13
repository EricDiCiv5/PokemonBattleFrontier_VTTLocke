import { Attack } from "./attack";

export interface Pokemon {
    name: string;
    nature: string;
    attacks: Attack[];
}
