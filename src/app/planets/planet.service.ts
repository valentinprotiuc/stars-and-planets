import {Injectable} from '@angular/core';
import {Planet} from './planet.model';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  private planets: Planet[] = [
    new Planet('Merkur', 'Sonne', 0.055),
    new Planet('Venus', 'Sonne', 0.815),
    new Planet('Erde', 'Sonne', 1),
  ];

  getPlanets(){
    return this.planets.slice();
  }

  constructor() {
  }
}
