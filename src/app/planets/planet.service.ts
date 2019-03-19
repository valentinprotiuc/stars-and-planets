import {Injectable} from '@angular/core';
import {Planet} from './planet.model';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  private planets: Planet[] = [
    new Planet('Merkur', 0.055),
    new Planet('Venus', 0.815),
    new Planet('Erde', 1),
  ];

  getPlanets() {
    return this.planets.slice();
  }

  constructor() {
  }
}
