import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Star} from '../star.model';
import {StarService} from '../star.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-stars-nav',
  templateUrl: './stars-nav.component.html',
  styleUrls: ['./stars-nav.component.css']
})
export class StarsNavComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  stars: Star[] = [];
  @ViewChild('searchFilter') searchFilter: ElementRef;


  constructor(private starService: StarService) {
  }

  filterStarList() {
    this.stars = this.starService.stars.filter(
      star => star.name.toLocaleLowerCase().includes(this.searchFilter.nativeElement.value.toLowerCase())
    );
  }

  sortList(param: string) {

    this.stars = this.stars.sort((star1, star2) => {
      const value1 = (param === 'mass') ? star1.solarMass : ((param === 'distance') ? star1.distance : star1.name.toLowerCase());
      const value2 = (param === 'mass') ? star2.solarMass : ((param === 'distance') ? star2.distance : star2.name.toLowerCase()) ;
      if (value1 > value2) {
        return 1;
      }
      if (value1 < value2) {
        return -1;
      }
      return 0;
    });
  }

  ngOnInit() {

    this.subscription = this.starService.starListChanged.subscribe(
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
