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

  filterStarList() {
    console.log('Input: ', this.searchFilter.nativeElement.value);
    this.stars.filter(
      star => star.name.toLocaleLowerCase().includes(this.searchFilter.nativeElement.value.toLowerCase())
    );
  }
}
