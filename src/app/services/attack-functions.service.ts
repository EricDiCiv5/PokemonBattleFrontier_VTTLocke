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

  public oriJSON: Trainer;

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

    this.oriJSON = {
        fullName: '',
        pokemons: [],
    }

    this.pkmn = {
        fullName: '',
        nature: '',
        attacks: [],
    }

    this.attcks = {
        name: '',
        type: '',
        style: '',
    }
  }

  selectAttack(oriJSON: any, chosedTrainer: string, chosedPokemon: string, rage: boolean) {
      var trainer = oriJSON.trainers.find((trainer: Trainer) => trainer.fullName == chosedTrainer);
      var pokemon = trainer.pokemon.find((pkm: Pokemon) => pkm.fullName == chosedPokemon);

      var natureConfig = this.natureDicts.find((nature: NatureDictionaries) => nature.name == pokemon.nature);
      
      if(rage){
          var natureValues = 
          {
            "attackValue": natureConfig?.rageAttVal, 
            "defenseValue": natureConfig?.rageDefVal,
          }
      }else{
          var natureValues = 
          {
            "attackValue": natureConfig?.basicAttkVal, 
            "defenseValue": natureConfig?.basicDefVal,
          }
      }
      
      var attackStyle = this.getRandomStyleAttack(natureValues);
      return this.getRandomAttack(pokemon, attackStyle);
  }

   getRandomStyleAttack(natureValues: any){
      var num=Math.random();
      if(num < natureValues.attackValue) return "Attack"; 
      else if(num < (natureValues.attackValue + natureValues.defenseValue)) return "Defense"; 
      else return "Support";
  }


   getRandomAttack(pokemon: Pokemon, styleAttack: string){
      var attackList = pokemon.attacks;
      if(pokemon.attacks.some((atk: any) => atk.style == styleAttack)){        
          attackList = pokemon.attacks.filter(atk => atk.style == styleAttack);
          var index = Math.floor(Math.random() * attackList.length-1);
      }else{
          var index = Math.floor(Math.random() * attackList.length-1);
      }

      return  attackList[index];
  }
}
