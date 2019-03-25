import {EventEmitter, Injectable} from '@angular/core';
import {Star} from './star.model';
import {HttpClient} from '@angular/common/http';
import {ServerService} from '../server.service';

@Injectable({
  providedIn: 'root'
})
export class StarService {

  starSelected = new EventEmitter<Star>();
  starListChanged = new EventEmitter();

  private stars: Star[] = [];

  addStar(star: Star) {
    return this.serverService.addStarToDB(star);
  }

  getStar(starName: string) {
    return this.stars.find(i => i.name === starName);
  }

  getStars() {
    return this.stars;
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

  updateStar(star: Star) {
    return this.serverService.updateStarInDB(star);
  }

  updateStarList() {
    this.serverService.getStarsFromDB().subscribe(
      (response: Star[]) => {
        this.stars = response;
        this.starListChanged.emit();
      }, (error) => {
        console.log(error);
      });
  }

  constructor(private http: HttpClient, private serverService: ServerService) {
  }
}
