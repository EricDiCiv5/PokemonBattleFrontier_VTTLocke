import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('eng');
    translate.use('eng');
  }

  ngOnInit(): void {
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }

}
