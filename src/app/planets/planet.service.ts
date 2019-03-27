import {Injectable} from '@angular/core';
import {Planet} from './planet.model';
import {StarService} from '../stars/star.service';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  private _selectedPlanet: Planet;

  get selectedPlanet() {
    return this._selectedPlanet;
  }

  set selectedPlanet(planet: Planet) {
    this._selectedPlanet = planet;
  }

  getPlanets() {
    const planets: Planet[] = [];
    this.starService.stars.forEach(
      (star) => {
        planets.push(...star.orbitingPlanets);
      }
    );
    return planets;
  }

  constructor(private starService: StarService) {
  }
}
