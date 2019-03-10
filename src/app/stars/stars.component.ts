import {Component, OnInit} from '@angular/core';
import {StarService} from './star.service';
import {Star} from './star.model';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css'],
  providers: [StarService]
})
export class StarsComponent implements OnInit {

  stars: Star[];

  constructor(private starService: StarService) {
  }

  ngOnInit() {
    this.stars = this.starService.getStars();
  }

}
