import {Component, OnDestroy, OnInit} from '@angular/core';
import {Star} from '../star.model';
import {StarService} from '../star.service';
import {Router} from '@angular/router';
import {Planet} from '../../planets/planet.model';
import {Subscription} from 'rxjs';
import {PlanetService} from '../../planets/planet.service';

@Component({
  selector: 'app-star-details',
  templateUrl: './star-details.component.html',
  styleUrls: ['./star-details.component.scss']
})
export class StarDetailsComponent implements OnInit, OnDestroy {

  selectedStar: Star;
  private subscription: Subscription;

  constructor(private starService: StarService, private router: Router, private planetService: PlanetService) {
  }

  ngOnInit() {

    this.selectedStar = this.starService.currentlySelectedStar;

    this.subscription = this.starService.starSelected.subscribe(
      (star: Star) => {
        this.selectedStar = star;
      },
      (error) => {
        throw error;
      }
    );
  }

  onPlanetSelected(planet: Planet) {
    this.router.navigate(['planets']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
