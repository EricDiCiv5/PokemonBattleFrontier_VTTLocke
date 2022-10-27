import { Attack } from "./attack";

export interface Pokemon {
    fullName: string;
    nature: string;
    attacks: Attack[];
}
