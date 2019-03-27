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

  sortList() {
    this.stars = this.stars.sort((star1, star2) => {
      const name1 = star1.name.toLowerCase();
      const name2 = star2.name.toLowerCase();
      if (name1 > name2) {
        return 1;
      }
      if (name1 < name2) {
        return -1;
      }
      return 0;
    });
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
