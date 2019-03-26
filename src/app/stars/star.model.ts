import {Planet} from '../planets/planet.model';

export class Star {

  constructor(private _id: string, public name: string, public spectralType: string, public solarMass: number,
              public solarRadius: number, public effectiveTemperature: number,
              public distance: number, public orbitingPlanets: Planet[]) {
  }

  get id() {
    return this._id;
  }
}
