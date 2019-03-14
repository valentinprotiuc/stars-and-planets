import {Component, Input, OnInit} from '@angular/core';
import {Star} from '../star.model';
import {StarService} from '../star.service';

@Component({
  selector: 'app-star-details',
  templateUrl: './star-details.component.html',
  styleUrls: ['./star-details.component.css']
})
export class StarDetailsComponent implements OnInit {

  @Input() selStar: Star;

  private selectedStar: Star;

  constructor(private starService: StarService) { }

  ngOnInit() {
    this.selectedStar = this.starService.lastSelectedStar;
    this.starService.starSelected.subscribe(
      (star: Star) => {
        this.selectedStar = star;
      }
    );
  }

}
