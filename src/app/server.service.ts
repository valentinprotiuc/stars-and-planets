import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Star} from './stars/star.model';

@Injectable()
export class ServerService {
  constructor(private http: HttpClient) {
  }

  getStarsFromDB() {

    this.http.get('https://stars-and-planets.herokuapp.com/data').subscribe(
      (response: Response) => {
        console.log('Get response: ', response);
        //const stars: Star[] = response.json();
      });
  }

  addStarToDB(star: Star) {

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

  updateStarInDB(star: Star) {
    return this.http.post('https://stars-and-planets.herokuapp.com/data', star);
  }

  removeStarFromDB(star: Star) {
    return this.http.post('https://stars-and-planets.herokuapp.com/remove', {_id: star.id});
  }
}
