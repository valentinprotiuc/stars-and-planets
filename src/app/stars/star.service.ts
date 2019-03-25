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
    this.serverService.removeStarFromDB(star.id).subscribe(
      (response) => {
        this.updateStarList();
        console.log('Removed: ', response);
      },
      (error) => {
        console.log(error);
      });
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
