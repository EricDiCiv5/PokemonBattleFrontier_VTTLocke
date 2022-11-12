import { Injectable } from '@angular/core';
import { ObtainDataService } from './obtain-data.service';

@Injectable({
  providedIn: 'root'
})
export class AttacksService {

  constructor(private obtainData: ObtainDataService) { }

     SelectAttack (oriJSON: any, chosedTrainer: string, chosedPokemon: string, rage: boolean)
  {
      var trainer = oriJSON.trainers.find((trainer: string) => trainer.name == chosedTrainer);
      var pokemon = trainer.pokemon.find((pkm: string) => pkm.name == chosedPokemon);

      var natureConfig = NatureDictionaries.find((nature: string) => nature.name == pokemon.nature);
      
      if(rage){
          var natureValues = 
          {
          "attackValue": natureConfig.rageAttackValue, 
          "defenseValue": natureConfig. rageDefenseValue,
          }
      }else{
          var natureValues = 
          {
          "attackValue": natureConfig.basicAttackValue, 
          "defenseValue": natureConfig. basicDefenseValue,
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


   getRandomAttack(pokemon: string, styleAttack: string){
      var attackList = pokemon.attacks;
      if(pokemon.attacks.any(atk => atk.style == styleAttack)){        
          attackList = pokemon.attacks.filter(atk => atk.style == styleAttack);
          var index = Math.floor(Math.random() * attackList.length-1);
      }else{
          var index = Math.floor(Math.random() * attackList.length-1);
      }

      return  attackList[index];
  }
}
