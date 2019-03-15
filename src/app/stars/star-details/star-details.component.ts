import {Component, OnInit} from '@angular/core';
import {Star} from '../star.model';
import {StarService} from '../star.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-star-details',
  templateUrl: './star-details.component.html',
  styleUrls: ['./star-details.component.css']
})
export class StarDetailsComponent implements OnInit {

  selectedStar: Star;

  constructor(private starService: StarService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.selectedStar = this.starService.getStar(params.starName);
      }
    );
  }

}
