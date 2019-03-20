import {Component, OnInit} from '@angular/core';
import {Star} from '../star.model';
import {StarService} from '../star.service';

@Component({
  selector: 'app-stars-nav',
  templateUrl: './stars-nav.component.html',
  styleUrls: ['./stars-nav.component.css']
})
export class StarsNavComponent implements OnInit {

  stars: Star[] = [];

  constructor(private starService: StarService) {
  }

  ngOnInit() {
    this.starService.starListChanged.subscribe(() => {
      this.stars = this.starService.getStars();
    });
    this.starService.updateStarList();
  }

}
