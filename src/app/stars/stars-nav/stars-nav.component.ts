import {Component, OnDestroy, OnInit} from '@angular/core';
import {Star} from '../star.model';
import {StarService} from '../star.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-stars-nav',
  templateUrl: './stars-nav.component.html',
  styleUrls: ['./stars-nav.component.css']
})
export class StarsNavComponent implements OnInit, OnDestroy {

  stars: Star[] = [];
  private subscription: Subscription;

  constructor(private starService: StarService) {
  }

  ngOnInit() {

    this.starService.starListChanged.subscribe(
      (stars: Star[]) => {
        this.stars = stars;
      },
      (error) => {
        throw error;

      });

    this.starService.getStarList();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
