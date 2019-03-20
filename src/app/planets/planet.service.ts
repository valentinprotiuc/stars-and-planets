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

  getPlanets() {
    return this.serverService.getStarsFromDB();
  }

  constructor(private serverService: ServerService) {
  }
}
