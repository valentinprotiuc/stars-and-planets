import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StarService} from '../star.service';
import {Star} from '../star.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Planet} from '../../planets/planet.model';

@Component({
  selector: 'app-star-edit',
  templateUrl: './star-edit.component.html',
  styleUrls: ['./star-edit.component.css']
})
export class StarEditComponent implements OnInit {

  @ViewChild('starName') starName: ElementRef;
  @ViewChild('starClass') starClass: ElementRef;
  @ViewChild('solarMass') solarMass: ElementRef;
  @ViewChild('distance') distance: ElementRef;
  private starIndex: number;
  star: Star;

  constructor(private starService: StarService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.star = JSON.parse(JSON.stringify(this.starService.getStar(params.starName)));
        if (this.star) {
          this.starName.nativeElement.value = this.star.name;
          this.starClass.nativeElement.value = this.star.spectralType;
          this.solarMass.nativeElement.value = this.star.solarMass;
          this.distance.nativeElement.value = this.star.distance;
          this.starIndex = this.starService.getStarIndex(params.starName);
        }
      }
    );
  }

  onAddChanges() {
    this.starService.updateStar(
      new Star(this.star.getId(), this.starName.nativeElement.value, this.starClass.nativeElement.value, this.solarMass.nativeElement.value,
        this.distance.nativeElement.value, [])
      , this.starIndex);
    this.router.navigate(['stars/details/' + this.starName.nativeElement.value]);
  }

  onCancel() {
    this.router.navigate(['stars']);
  }

  onRemovePlanet(planet: Planet) {
    const index = this.star.orbitingPlanets.findIndex(i => i.name === planet.name);
    this.star.orbitingPlanets.splice(index, 1);
  }
}
