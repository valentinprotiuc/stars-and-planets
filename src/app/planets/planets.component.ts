import { Component, OnInit } from '@angular/core';
import {Planet} from './planet.model';
import {PlanetService} from './planet.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css'],
  providers: [PlanetService]
})
export class PlanetsComponent implements OnInit {

  planets: Planet[] = [];
  selectedPlanet: Planet;

  constructor(private planetService: PlanetService) { }

  ngOnInit() {
    this.planets = this.planetService.getPlanets();
    this.selectedPlanet = this.planetService.selectedPlanet;
  }

  selectTableRow(planet: Planet) {
    this.selectedPlanet = planet;
  }
}
