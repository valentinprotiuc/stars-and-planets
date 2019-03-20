import {Injectable} from '@angular/core';
import {Planet} from './planet.model';
import {StarService} from '../stars/star.service';
import {ServerService} from '../server.service';
import {Star} from '../stars/star.model';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  private planets: Planet[];

  getPlanets(): Planet[] {
    console.log('getting planets');
    this.serverService.getStarsFromDB().subscribe(
      (response: Star[]) => {
        console.log('got stars');
        response.forEach((elem) => {
          this.planets.push(...elem.orbitingPlanets);
        });
      },
      (error) => console.log(error)
    );
    console.log('got planets', this.planets);
    return this.planets;

  }

  constructor(private serverService: ServerService) {
  }
}
