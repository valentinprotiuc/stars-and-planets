import {Component, OnInit} from '@angular/core';
import {StarService} from '../star.service';
import {Star} from '../star.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Planet} from '../../planets/planet.model';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-star-edit',
  templateUrl: './star-edit.component.html',
  styleUrls: ['./star-edit.component.css']
})
export class StarEditComponent implements OnInit {

  star: Star;
  editStarForm: FormGroup;

  constructor(private starService: StarService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.star = JSON.parse(JSON.stringify(this.starService.currentlySelectedStar));
    this.editStarForm = new FormGroup({
      starName: new FormControl(this.star.name, Validators.required),
      spectralType: new FormControl(this.star.spectralType),
      solarMass: new FormControl(this.star.solarMass),
      solarRadius: new FormControl(this.star.solarRadius),
      effectiveTemperature: new FormControl(this.star.effectiveTemperature),
      distance: new FormControl(this.star.distance),
      planets: new FormArray([])
    });
  }

  onSubmit() {

    this.star.name = this.editStarForm.value.starName;
    this.star.spectralType = this.editStarForm.value.spectralType;
    this.star.solarMass = this.editStarForm.value.solarMass;
    this.star.solarRadius = this.editStarForm.value.solarRadius;
    this.star.effectiveTemperature = this.editStarForm.value.effectiveTemperature;
    this.star.distance = this.editStarForm.value.distance;
    this.starService.updateStar(this.star);
    this.router.navigate(['stars/details']);
  }

  onRemovePlanet(planet: Planet) {
    const index = this.star.orbitingPlanets.findIndex(i => i.name === planet.name);
    this.star.orbitingPlanets.splice(index, 1);
  }

  onCancel() {
    this.router.navigate(['stars']);
  }
}
