import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Trainer } from '../models/trainer';

@Injectable({
  providedIn: 'root'
})
export class ObtainDataService {

  private readonly apiUrl1 = environment.url1;
  private readonly apiUrl2 = environment.url2;

  constructor(private http: HttpClient) { }

  getTrainers(){
    return this.http.get<Trainer[]>(`${this.apiUrl1}/entrenadores`);
  }

  getTrainers2(){
    return this.http.get<Trainer[]>(`${this.apiUrl2}/entrenadores`);
  }
}
