import {Component, OnInit} from '@angular/core';
import {Planet} from './planet.model';
import {PlanetService} from './planet.service';
import {StarService} from '../stars/star.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss'],
  providers: [PlanetService]
})
export class PlanetsComponent implements OnInit {

  planets: Planet[] = [];
  sortParam: string;

  constructor(private planetService: PlanetService, private starService: StarService) {
  }

  ngOnInit() {
    this.starService.getStarList();
    this.starService.starListChanged.subscribe(
      () => {
        this.planets = this.planetService.getPlanets();
      },
      (error) => {
        throw error;
      }
    );
  }

  sort(param: 'name' | 'class' | 'mass' | 'radius' | 'period' | 'dist' | 'esi') {

    if (this.sortParam === param) {
      this.planets.reverse();
    } else {
      this.sortParam = param;
      this.planets = this.planets.sort((planet1, planet2) => {
        let value1;
        let value2;
        switch (param) {
          case 'name' : {
            value1 = planet1.planetName.toLowerCase();
            value2 = planet2.planetName.toLowerCase();
            break;
          }
          case 'class' : {
            value1 = (planet1.planetClass === null) ? 'z' : planet1.planetClass.toLowerCase();
            value2 = (planet2.planetClass === null) ? 'z' : planet2.planetClass.toLowerCase();
            break;
          }
          case 'mass' : {
            value1 = +planet1.planetMass;
            value2 = +planet2.planetMass;
            break;
          }
          case 'radius' : {
            value1 = +planet1.planetRadius;
            value2 = +planet2.planetRadius;
            break;
          }
          case 'period' : {
            value1 = +planet1.planetPeriod;
            value2 = +planet2.planetPeriod;
            break;
          }
          case 'dist' : {
            value1 = +planet1.planetDistance;
            value2 = +planet2.planetDistance;
            break;
          }
          case 'esi' : {
            value1 = +planet1.planetESI;
            value2 = +planet2.planetESI;
            break;
          }

        }

        if (value1 > value2) {
          return 1;
        }
        if (value1 < value2) {
          return -1;
        }
        return 0;
      });
    }
  }
}
