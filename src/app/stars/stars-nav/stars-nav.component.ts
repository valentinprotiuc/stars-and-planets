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
    console.log('Stars from nav: ', this.stars);
    console.log('Stars from Service: ', this.starService.stars);
    this.stars = this.starService.stars.filter(
      star => star.name.toLocaleLowerCase().includes(this.searchFilter.nativeElement.value.toLowerCase())
    );
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
