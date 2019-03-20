import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Star} from './stars/star.model';

@Injectable()
export class ServerService {
  constructor(private http: HttpClient) {
  }

  getStarsFromDB() {
    return this.http.get('https://stars-and-planets.herokuapp.com/data');
  }

  addStarToDB(star: Star) {
    console.log('Star: ', star);
    const noIdStar = {
      name: star.name,
      spectralType: star.spectralType,
      solarMass: +star.solarMass,
      distance: +star.distance,
      orbitingPlanets: star.orbitingPlanets
    };
    console.log('NoIdStar: ', noIdStar);
    return this.http.post('https://stars-and-planets.herokuapp.com/save', noIdStar);
  }

  updateStarInDB(star: Star) {
    return this.http.post('https://stars-and-planets.herokuapp.com/save', star);
  }

  removeStarFromDB() {

  }
}
