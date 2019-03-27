import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StarService} from '../star.service';
import {Star} from '../star.model';
import {Planet} from '../../planets/planet.model';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-star-add',
  templateUrl: './star-add.component.html',
  styleUrls: ['./star-add.component.css']
})
export class StarAddComponent implements OnInit {

  newStarForm: FormGroup;
  newPlanetForm: FormGroup;

  constructor(private starService: StarService, private router: Router) {
  }

  ngOnInit() {

    this.newStarForm = new FormGroup({
      starName: new FormControl(null, Validators.required),
      spectralType: new FormControl(null),
      solarMass: new FormControl(null, this.numberValidator),
      solarRadius: new FormControl(null, this.numberValidator),
      effectiveTemperature: new FormControl(null, this.numberValidator),
      distance: new FormControl(null, this.numberValidator),
      planets: new FormArray([])
    });
  }

  get formArray(): FormArray {
    return this.newStarForm.get('planets') as FormArray;
  }

  onSubmit() {

    const planets: Planet[] = [];

    this.newStarForm.value.planets.forEach((planet) => {
      planets.push(planet as Planet);
    });

    this.starService.addStar(
      new Star('fakeId', this.newStarForm.value.starName, this.newStarForm.value.spectralType, this.newStarForm.value.solarMass,
        this.newStarForm.value.solarRadius, this.newStarForm.value.effectiveTemperature, this.newStarForm.value.distance, planets)
    );
    this.router.navigate(['stars/details/']);
  }

  onCancel() {
    // Todo: Clean the form and navigate away

    this.router.navigate(['stars']);
  }

  onAddNewPlanet() {
    this.newPlanetForm = new FormGroup({
      planetName: new FormControl(null, Validators.required),
      planetClass: new FormControl(null),
      planetMass: new FormControl(null),
      planetRadius: new FormControl(null),
      planetPeriod: new FormControl(null),
      planetDistance: new FormControl(null),
      planetESI: new FormControl(null),
    });
    (this.newStarForm.get('planets') as FormArray).push(this.newPlanetForm);
  }

  numberValidator(control: FormControl): { [s: string]: boolean } {
    if (!(control.value instanceof Number)) {
      return {charsNotAllowed: true};
    }
    return null;
  }
}
