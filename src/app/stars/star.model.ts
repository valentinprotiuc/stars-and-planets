import {Planet} from '../planets/planet.model';

export class Star {

  constructor(public name: string, public spectralType: string, public solarMass: number, public orbitingPlanets: Planet[]) {
  }

}
