import {Component, Input, OnInit} from '@angular/core';
import {Star} from '../star.model';
import {StarService} from '../star.service';
import {ServerService} from '../../server.service';

@Component({
  selector: 'app-stars-nav',
  templateUrl: './stars-nav.component.html',
  styleUrls: ['./stars-nav.component.css']
})
export class StarsNavComponent implements OnInit {

  stars: Star[];

  constructor(private starService: StarService, private serverService: ServerService) {
  }

  ngOnInit() {
    this.serverService.getStarsFromDB().subscribe(
      (response) => console.log('The response: ' , response),
      (error) => console.log(error)
    );
    this.stars = this.starService.getStars();
    this.starService.starListChanged.subscribe(
      (stars: Star[]) => {
        this.stars = stars;
      }
    );
  }

}
