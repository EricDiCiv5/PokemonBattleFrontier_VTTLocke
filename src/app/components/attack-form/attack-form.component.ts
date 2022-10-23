import { Component, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/trainer';
import { ObtainDataService } from 'src/app/services/obtain-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'attack-form',
  templateUrl: './attack-form.component.html',
  styleUrls: ['./attack-form.component.scss']
})
export class AttackFormComponent implements OnInit {

  public attackForm!: FormGroup;

  trainers: Trainer[] = [];

  constructor(private obtainData: ObtainDataService) {

  }

  ngOnInit(): void {
    this.obtainData.getTrainers().subscribe((entrenadores) => {
      this.trainers = entrenadores;
    })

    this.obtainData.getTrainers2().subscribe((entrenadores2) => {
      this.trainers = entrenadores2;
    })

    this.attackForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      msgSubject: new FormControl('', [Validators.required]),
      descrip: new FormControl('', [Validators.maxLength(1000)]),
      recaptcha: new FormControl('', [Validators.required])
    })
  }

}
