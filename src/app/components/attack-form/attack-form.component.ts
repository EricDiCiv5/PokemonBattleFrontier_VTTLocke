import { Component, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/trainer';
import { ObtainDataService } from 'src/app/services/obtain-data.service';

@Component({
  selector: 'attack-form',
  templateUrl: './attack-form.component.html',
  styleUrls: ['./attack-form.component.scss']
})
export class AttackFormComponent implements OnInit {

  trainers: Trainer[] = [];

  constructor(private obtainData: ObtainDataService) {

  }

  ngOnInit(): void {
    this.obtainData.getTrainers().subscribe(entrenadores => {
      this.trainers = entrenadores;
    })

    this.obtainData.getTrainers2().subscribe((entrenadores2) => {
      this.trainers = entrenadores2;
    })
  }

}
