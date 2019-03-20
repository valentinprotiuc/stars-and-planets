import {Planet} from '../planets/planet.model';

export class Star {

  constructor(private id: string, public name: string, public spectralType: string, public solarMass: number,
              public distance: number, public orbitingPlanets: Planet[]) {
  }

  getId() {
    return this.id;
  }

}
