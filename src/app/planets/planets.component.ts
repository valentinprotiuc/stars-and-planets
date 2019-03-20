import { Component, OnInit } from '@angular/core';
import {Planet} from './planet.model';
import {PlanetService} from './planet.service';
import {Star} from '../stars/star.model';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css'],
  providers: [PlanetService]
})
export class PlanetsComponent implements OnInit {

  planets: Planet[] = [];

  constructor(private planetService: PlanetService) { }

  ngOnInit() {
    this.planetService.getPlanets().subscribe(
      (response: Star[]) => {
        response.forEach((elem) => {
          this.planets.push(...elem.orbitingPlanets);
        });
      },
      (error) => console.log(error)
    );
  }

}
