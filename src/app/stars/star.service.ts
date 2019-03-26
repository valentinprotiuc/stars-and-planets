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
    this.serverService.addStarToDB(star).subscribe(
      (response: Star[]) => {
        this.stars = response;
        this.starListChanged.next(response);
        this.currentlySelectedStar = this.getStar(star.name);
        this.starSelected.next(this.getStar(star.name));
      },
      (error) => {
        throw error;
      }
    );
  }

  updateStar(star: Star) {
    console.log('Star id in star.service: ', star.id);
    console.log('Star in star.service: ', star);
    this.serverService.updateStarInDB(star).subscribe(
      (response: Star[]) => {
        this.stars = response;
        this.starListChanged.next(response);
        this.currentlySelectedStar = this.getStar(star.name);
        this.starSelected.next(this.getStar(star.name));
      },
      (error) => {
        throw error;
      }
    );
  }

  getStarList() {
    this.serverService.getStarsFromDB().subscribe(
      (response: Star[]) => {
        this.stars = response;
        this.starListChanged.next(response);
      }, (error) => {
        console.log(error);
      });
  }

  removeStar(star: Star) {
    this.serverService.removeStarFromDB(star).subscribe(
      (response: Star[]) => {
        this.stars = response;
        this.starListChanged.next(response);
      },
      (error) => {
        throw error;
      },
    );
  }

  getStar(starName: string) {
    return this.stars.find(i => i.name === starName);
  }

  constructor(private http: HttpClient, private serverService: ServerService) {
  }
}
