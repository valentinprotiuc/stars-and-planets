import {Component, OnInit} from '@angular/core';
import {Star} from '../star.model';
import {StarService} from '../star.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Planet} from '../../planets/planet.model';

@Component({
  selector: 'app-star-details',
  templateUrl: './star-details.component.html',
  styleUrls: ['./star-details.component.css']
})
export class StarDetailsComponent implements OnInit {

  selectedStar: Star ;

  constructor(private starService: StarService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.selectedStar = this.starService.getStar(params.starName);
      }
    );
  }

  onPlanetSelected(planet: Planet) {
    this.router.navigate(['planets']);
  }
}
