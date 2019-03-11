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
  selectedStar: Star;
  editingStar = false;

  constructor(private starService: StarService) {
  }

  ngOnInit() {
    this.stars = this.starService.getStars();
    this.starService.starSelected.subscribe(
      (star: Star) => {
        this.selectedStar = star;
      }
    );
    this.starService.starListChanged.subscribe(
      (stars: Star[]) => {
        this.stars = stars;
      }
    );
    this.starService.editingStar.subscribe(
      (flag: boolean) => {
        this.editingStar = flag;
      }
    );
  }

  addStar() {
    this.selectedStar = null;
    this.editingStar = true;
  }

  editStar() {

  }

  removeStar() {
    this.starService.removeStar(this.selectedStar);
    this.selectedStar = null;
  }
}
