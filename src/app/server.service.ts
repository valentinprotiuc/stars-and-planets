import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Star} from './stars/star.model';
import {StarService} from './stars/star.service';

@Injectable()
export class ServerService {
  constructor(private http: HttpClient, private starService: StarService) {
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
    this.http.post('https://stars-and-planets.herokuapp.com/data', noIdStar).subscribe(
      (response: Star[]) => {
        this.starService.stars = response;
        this.starService.starListChanged.next(response);
      },
      (error) => {
        throw error;
      }
    );
  }

  getStarsFromDB() {

    this.http.get('https://stars-and-planets.herokuapp.com/data').subscribe(
      (response: Star[]) => {
        this.starService.stars = response;
        this.starService.starListChanged.next(response);
      }, (error) => {
        console.log(error);
      });
  }

  updateStarInDB(star: Star) {
    this.http.post('https://stars-and-planets.herokuapp.com/data', star).subscribe(
      (response: Star[]) => {
        this.starService.stars = response;
        this.starService.starListChanged.next(response);
        this.starService.currentlySelectedStar = this.starService.getStar(star.name);
        this.starService.starSelected.next(this.starService.getStar(star.name));
      },
      (error) => {
        throw error;
      }
    );
  }

  removeStarFromDB(star: Star) {
    this.http.post('https://stars-and-planets.herokuapp.com/remove', {_id: star.id}).subscribe(
      (response: Star[]) => {
        this.starService.stars = response;
        this.starService.starListChanged.next(response);
      },
      (error) => {
        throw error;
      },
    );
  }
}
