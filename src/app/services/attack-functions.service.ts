import { Injectable } from '@angular/core';
import { Trainer } from '../models/trainer';
import { NatureDictionaries } from '../models/natureDicts';
import { ObtainDataService } from './obtain-data.service';
import { Pokemon } from '../models/pokemon';
import { Attack } from '../models/attack';

@Injectable({
  providedIn: 'root'
})
export class AttacksService {

  public natureDicts: NatureDictionaries[];

  public pkmn: Pokemon;

  public attcks: Attack;

  constructor(private obtainData: ObtainDataService) {
    this.natureDicts = [
        {
        name: '',
        basicAttkVal: 0.00,
        basicDefVal: 0.00,
        basicSuppVal: 0.00,
        rageAttVal: 0.00,
        rageDefVal: 0.00,
        rageSuppVal: 0.00,
        }
    ]

    this.pkmn = {
        name: '',
        nature: '',
        attacks: [],
    }

    this.attcks = {
        name: '',
        type: '',
        style: '',
    }

  }

  selectAttack(trainers: Trainer[], chosenTrainer: string, chosenPokemon: string, rage: boolean) {

    if (!trainers || trainers.length === 0) return '';
  
    const trainer = trainers.find(trainer => trainer.fullName === chosenTrainer);
      
    if(!trainer) return '';
  
    const pokemon = trainer.pokemons.find(pkm => pkm.name === chosenPokemon);
  
    if(!pokemon) return '';
  
    const natureConfig = this.natureDicts.find(nature => nature.name === pokemon.nature);
  
    if (!natureConfig) return '';
  
    let natureValues;
    if (rage) {
      natureValues = {
        attackValue: natureConfig.rageAttVal,
        defenseValue: natureConfig.rageDefVal,
      };
    } else {
      natureValues = {
        attackValue: natureConfig.basicAttkVal,
        defenseValue: natureConfig.basicDefVal,
      };
    }
  
    const attackStyle = this.getRandomStyleAttack(natureValues);

    return this.getRandomAttack(pokemon, attackStyle);
  }
  

   getRandomStyleAttack(natureValues: any){
      let num=Math.random();
      let styleAttack;
      if(num < natureValues.attackValue) styleAttack = "Attack"; 
      else if(num < (natureValues.attackValue + natureValues.defenseValue)) styleAttack = "Defense"; 
      else styleAttack = "Support";

      console.log(styleAttack);

      return styleAttack;
  }


   getRandomAttack(pokemon: Pokemon, styleAttack: string){
      let attackList = pokemon.attacks;

      if (attackList.length === 0) return '';

      const attack = attackList.find(atk => atk.style === styleAttack);

      if (attack) return attack.name;
      else return attackList[Math.floor(Math.random() * attackList.length)].name;

  }

}
