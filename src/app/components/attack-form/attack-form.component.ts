import { Component, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/trainer';
import { ObtainDataService } from 'src/app/services/obtain-data.service';
import { TranslateService } from '@ngx-translate/core/public_api';

@Component({
  selector: 'attack-form',
  templateUrl: './attack-form.component.html',
  styleUrls: ['./attack-form.component.scss']
})
export class AttackFormComponent implements OnInit {

  trainers: Trainer[] = [];

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    
  }

}
