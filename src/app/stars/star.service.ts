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
    return this.serverService.getStarsFromDB();
  }

  addStar(star: Star) {
    this.stars.push(star);
    this.starListChanged.emit(this.stars.slice());
    return this.serverService.addStarToDB(star);
  }

  updateStar(star: Star) {
    return this.serverService.updateStarInDB(star);
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
