import {Injectable} from '@angular/core';
import {Planet} from './planet.model';
import {StarService} from '../stars/star.service';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
  private planets: Planet[] = [];

  getPlanets() {
    this.starService.stars.forEach(
      (star) => {
        this.planets.push(...star.orbitingPlanets);
      }
    );
    return this.planets;
  }

  constructor(private starService: StarService) {
  }
}
