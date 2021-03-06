import {Injectable} from '@angular/core';
import {Star} from './star.model';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';

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
    this.auth.addStarToDB(star).subscribe(
      (response: Star[]) => {
        this.stars = response;
        this.starListChanged.next(response);
        this.currentlySelectedStar = this.getStar(star.name);
        this.starSelected.next(this.getStar(star.name));
        this.router.navigate(['stars/details/']);
      },
      (error) => {
        throw error;
      }
    );
  }

  updateStar(star: Star) {
    this.auth.updateStarInDB(star).subscribe(
      (response: Star[]) => {
        console.log(response);
        this.stars = response;
        this.starListChanged.next(response);
        this.currentlySelectedStar = this.getStar(star.name);
        this.starSelected.next(this.getStar(star.name));
        this.router.navigate(['stars/details']);
      },
      (error) => {
        throw error;
      }
    );
  }

  getStarList() {
    this.auth.getStarsFromDB().subscribe(
      (response: Star[]) => {
        this.stars = response;
        this.starListChanged.next(response);
      }, (error) => {
        console.log(error);
      });
  }

  removeStar(star: Star) {
    this.auth.removeStarFromDB(star).subscribe(
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

  constructor(private auth: AuthenticationService, private router: Router) {
  }
}
