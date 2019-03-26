import {Planet} from '../planets/planet.model';

export class Star {

  private _id: string;
  public name: string;
  public spectralType: string;
  public solarMass: number;
  public solarRadius: number;
  public effectiveTemperature: number;
  public distance: number;
  public orbitingPlanets: Planet[];


  constructor(id: string, name: string, spectralType: string, solarMass: number,
              solarRadius: number, effectiveTemperature: number,
              distance: number, orbitingPlanets: Planet[]) {
    this._id = id;
    this.name = name;
    this.spectralType = spectralType;
    this.solarMass = solarMass;
    this.solarRadius = solarRadius;
    this.effectiveTemperature = effectiveTemperature;
    this.distance = distance;
    this.orbitingPlanets = orbitingPlanets;
  }

  get id() {
    return this._id;
  }
}
