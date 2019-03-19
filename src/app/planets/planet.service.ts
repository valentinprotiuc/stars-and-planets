import {Injectable} from '@angular/core';
import {Planet} from './planet.model';
import {StarService} from '../stars/star.service';
import {ServerService} from '../server.service';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  private planets: Planet[];

  getPlanets() {
    return this.planets;

  }

  constructor(private serverService: ServerService) {
  }
}
