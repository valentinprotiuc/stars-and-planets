import {Injectable} from '@angular/core';
import {Star} from './star.model';
import {HttpClient} from '@angular/common/http';
import {ServerService} from '../server.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StarService {

  starSelected = new Subject<Star>();

  starListChanged = new Subject<Star[]>();

  private _stars: Star[] = [];

  private _currentlySelectedStar: Star;

  // Getters and setters
  get stars() {
    return this._stars;
  }

  set stars(stars: Star[]) {
    this._stars = stars;
  }

  get currentlySelectedStar() {
    return this._currentlySelectedStar;
  }

  set currentlySelectedStar(star: Star) {
    this._currentlySelectedStar = star;
  }

  // Redirecting requests to server service
  addStar(star: Star) {
    this.serverService.addStarToDB(star);
  }

  updateStar(star: Star) {
    this.serverService.updateStarInDB(star);
  }

  getStarList() {
    this.serverService.getStarsFromDB();
  }

  getStar(starName: string) {
    return this.stars.find(i => i.name === starName);
  }

  removeStar(star: Star) {
    this.serverService.removeStarFromDB(star);
  }





  constructor(private http: HttpClient, private serverService: ServerService) {
  }
}
