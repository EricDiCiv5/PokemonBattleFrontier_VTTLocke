import { Component, OnInit, ViewChild } from '@angular/core';
import { Trainer } from 'src/app/models/trainer';
import { ObtainDataService } from 'src/app/services/obtain-data.service';
import { Pokemon } from 'src/app/models/pokemon';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AttacksService } from 'src/app/services/attack-functions.service';
import { Attack } from 'src/app/models/attack';

@Component({
  selector: 'attack-form',
  templateUrl: './attack-form.component.html',
  styleUrls: ['./attack-form.component.scss']
})
export class AttackFormComponent implements OnInit {

  public attacksForm!: FormGroup;

  trainers: Trainer[];
  trainerNames: string[];
  trainerName: string; 
  pokemons: Pokemon[];
  pokemonName: string;
  rage: boolean = false;
  randomAttacks: Attack[];
  selectedAttack: string;
  @ViewChild('matSelect', { static: false }) matSelect!: any;

  constructor( private obtainData: ObtainDataService, private attackService: AttacksService) {
    this.trainers = [{
      fullName: '',
      pokemons: [],
    }]
    this.pokemons = [{
      name: '',
      nature: '',
      attacks: [],
    }]
    this.trainerName = '';
    this.trainerNames = [];
    this.pokemonName = '';
    this.randomAttacks = [{
      name: '',
      type: '',
      style: '',
    }];
    this.selectedAttack = '';

  }


  ngOnInit(): void {
    this.obtainData.getTrainers().subscribe( {
      next: (entrenadores: Trainer[]) => this.trainers = entrenadores,
      error: (err: Error) => console.log('Hubo un error en el observable '),
      complete: () => console.log('Observer got a complete notification'), 
    });

    this.attacksForm = new FormGroup({
      trainerName: new FormControl('', [Validators.required]),
      pokemonName: new FormControl('', [Validators.required]),
      lifeUnderFifty: new FormControl('', [Validators.required]),
    });

    this.obtainData.getTrainersNames().subscribe({
      next: (nombres: string[]) => {
        this.trainerNames = nombres
      },
      error: (err: Error) => console.log('Hubo un error en el observable '),
      complete: () => {
        console.log('Observer got a complete notification')
      },
    });


    this.attacksForm.controls['trainerName'].valueChanges.subscribe((x)=>{
      this.obtainData.getPokemonsOfATrainer(this.assignTrainerName()).subscribe( {
            next: (pokemones: Pokemon[][]) => this.pokemons = pokemones[0],
            error: (err: Error) => console.log('Hubo un error en el observable '),
            complete: () => console.log('Observer got a complete notification'), 
      });
    })

    this.attacksForm.controls['pokemonName'].valueChanges.subscribe((x) => {
      this.obtainData.getAttacksOfAPokemon(this.assignPokemonName()).subscribe({
        next: (ataques: Attack[]) => this.randomAttacks = ataques,
        error: (err: Error) => console.log('An error occurred:', err),
        complete: () => console.log('Observer got a complete notification'),
      });
    });
  }

  assignTrainerName() {
    // Get the selected value from the mat-select element
    const selectedValue = this.attacksForm.controls['trainerName'].value;

    // Check if the selected value is in the this.trainerNames array
    const selectedTrainer = this.trainerNames.find(name => name === selectedValue);

    console.log(selectedTrainer);

    // If the selected value is in the array, assign it to this.trainerName
    if (selectedTrainer) {
      this.trainerName = selectedTrainer;
    }

    return this.trainerName;
  }

  assignPokemonName() {

    
    // Get the selected value from the mat-select element
    const selectedValue2 = this.attacksForm.controls['pokemonName'].value;

    // Check if the selected value is in the this.trainerNames array
    const selectedPokemon = this.pokemons.find(pokemon => pokemon.name === selectedValue2);

    // If the selected value is in the array, assign it to this.trainerName
    if (selectedPokemon) {
      this.pokemonName = selectedPokemon.name;
    }

    this.selectedAttack = this.attackService.getRandomAttack(selectedPokemon!, this.attacksForm.controls['lifeUnderFifty'].value);

    console.log(this.pokemonName);

    return this.pokemonName;
  }

  // generateRandomAttack(){
  //   // Proceed with assigning the value to this.randomAttack

  //   this.selectedAttack = this.attackService.selectAttack(this.trainers, this.trainerName, this.pokemonName, this.rage);
  //   console.log(this.selectedAttack);

  //   return this.selectedAttack;
  // }

}
