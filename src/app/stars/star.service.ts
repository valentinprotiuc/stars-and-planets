import {EventEmitter, Injectable} from '@angular/core';
import {Star} from './star.model';
import {HttpClient} from '@angular/common/http';
import {ServerService} from '../server.service';

@Injectable({
  providedIn: 'root'
})
export class StarService {

  starSelected = new EventEmitter<Star>();
  starListChanged = new EventEmitter<Star[]>();
  editingStar = new EventEmitter<boolean>();

  private stars: Star[];

  getStar(starName: string) {
    return this.stars.find(i => i.name === starName);
  }

  getStarIndex(starName: string) {
    return this.stars.findIndex(i => i.name === starName);
  }

  getStars() {
    this.serverService.getStarsFromDB().subscribe(
      (response: Star[]) => {
        this.stars = response;
        this.starListChanged.emit(this.stars);
      },
      (error) => console.log(error)
    );

    return this.stars;
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

  constructor(private http: HttpClient, private serverService: ServerService) {
  }
}
