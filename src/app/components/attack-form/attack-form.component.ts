import { Component, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/trainer';
import { ObtainDataService } from 'src/app/services/obtain-data.service';
import { TranslateService } from '@ngx-translate/core';
import { Pokemon } from 'src/app/models/pokemon';

@Component({
  selector: 'attack-form',
  templateUrl: './attack-form.component.html',
  styleUrls: ['./attack-form.component.scss']
})
export class AttackFormComponent implements OnInit {

  trainers: Trainer[] = [];
  trainer: Trainer;
  pokemons: Pokemon[] = [];
  pokemon: Pokemon;

  constructor(private translate: TranslateService, private obtainData: ObtainDataService) {
    translate.setDefaultLang('en');
    translate.use('en');
    this.trainer = {
      fullName: '',
      pokemons: [],
    }
    this.pokemon = {
      fullName: '',
      nature: '',
      attacks: [],
    }
  }

  ngOnInit(): void {
    this.obtainData.getTrainers().subscribe( entrenadores => {
      this.trainers = entrenadores;
    })

    this.obtainData.getTrainers2().subscribe( entrenadores => {
      this.trainers = entrenadores;
    })

  }

}
