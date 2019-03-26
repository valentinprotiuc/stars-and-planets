import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Star} from './stars/star.model';

@Injectable()
export class ServerService {
  constructor(private http: HttpClient) {
  }

  addStarToDB(star: Star) {

    // Todo: use delete star._id to remove the id instead of defining a new object. Maybe first clone

    const noIdStar = {
      name: star.name,
      spectralType: star.spectralType,
      solarMass: +star.solarMass,
      solarRadius: +star.solarRadius,
      effectiveTemperature: +star.effectiveTemperature,
      distance: +star.distance,
      orbitingPlanets: star.orbitingPlanets
    };
    return this.http.post('https://stars-and-planets.herokuapp.com/data', noIdStar);
  }

  getStarsFromDB() {
    return this.http.get('https://stars-and-planets.herokuapp.com/data');
  }

  updateStarInDB(star: Star) {
    return this.http.post('https://stars-and-planets.herokuapp.com/data', star);
  }

  removeStarFromDB(star: Star) {
    return this.http.post('https://stars-and-planets.herokuapp.com/remove', {_id: star.id});
  }
}
