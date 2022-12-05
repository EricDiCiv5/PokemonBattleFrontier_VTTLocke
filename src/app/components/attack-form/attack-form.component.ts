import { Component, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/trainer';
import { ObtainDataService } from 'src/app/services/obtain-data.service';
import { Pokemon } from 'src/app/models/pokemon';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AttacksService } from 'src/app/services/attack-functions.service';

@Component({
  selector: 'attack-form',
  templateUrl: './attack-form.component.html',
  styleUrls: ['./attack-form.component.scss']
})
export class AttackFormComponent implements OnInit {

  public attacksForm!: FormGroup;

  trainers: Trainer[];
  trainerName: string = '';
  pokemonName: string = '';
  pokemons: Pokemon[] = [];
  rage: boolean = false;

  constructor( private obtainData: ObtainDataService, private attackService: AttacksService) {
    this.trainers = [{
      fullName: '',
      pokemons: [],
    }]
  }


  ngOnInit(): void {
    
    this.obtainData.getTrainers().subscribe( {
      next: (entrenadores: Trainer[]) => this.trainers = entrenadores,
      error: (err: Error) => console.log('Hubo un error en el observable '),
      complete: () => console.log('Observer got a complete notification'), 
    });

    this.obtainData.getPokemonsOfATrainer(this.trainerName).subscribe( {
      next: (pokemones: Pokemon[]) => this.pokemons = pokemones,
      error: (err: Error) => console.log('Hubo un error en el observable '),
      complete: () => console.log('Observer got a complete notification'), 
    });

    this.attacksForm = new FormGroup({
      trainerName: new FormControl('', [Validators.required]),
      pokemonName: new FormControl('', [Validators.required]),
      lifeUnderFifty: new FormControl('', [Validators.required]),
    })

  }

  generateRandomAttack(){
    this.trainerName = this.attacksForm.controls['trainerName'].value;
    this.pokemonName = this.attacksForm.controls['pokemonName'].value;
    this.attackService.selectAttack(this.trainers, this.trainerName, this.pokemonName, this.rage );
  }

}
