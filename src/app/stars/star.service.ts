import {EventEmitter, Injectable} from '@angular/core';
import {Star} from './star.model';
import {Planet} from '../planets/planet.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StarService {

  starSelected = new EventEmitter<Star>();
  starListChanged = new EventEmitter<Star[]>();
  editingStar = new EventEmitter<boolean>();

  private stars: Star[] = [
    new Star('Sonne', 'Gelber Zwerg', 1, [
      new Planet('Merkur', 'Sonne', 0.055),
      new Planet('Venus', 'Sonne', 0.815)
    ]),
    new Star('Alpha Centauri A', 'Gelber Zwerg', 1.1, []),
    new Star('Alpha Centauri B', 'Oranger Zwerg', 0.93, []),
    new Star('Proxima Centauri', 'Roter Zwerg', 0.12, [])

  ];

  getStar(starName: string) {
    return this.stars.find(i => i.name === starName);
  }

  getStarIndex(starName: string) {
    return this.stars.findIndex(i => i.name === starName);
  }

  getStars() {
    return this.stars.slice();
  }

  addStar(star: Star) {
    this.stars.push(star);
    this.starListChanged.emit(this.stars.slice());
    return this.http.post('https://stars-and-planets.herokuapp.com/save', star);
  }

  updateStar(star: Star, index: number) {
    this.stars[index].name = star.name;
    this.stars[index].spectralType = star.spectralType;
    this.stars[index].solarMass = star.solarMass;
  }

  removeStar(star: Star) {
    this.stars.forEach(
      (item, index) => {
        if (item === star) {
          this.stars.splice(index, 1);
          this.starListChanged.emit(this.stars);
        }
      }
    );
  }

  constructor(private http: HttpClient) {
  }
}
