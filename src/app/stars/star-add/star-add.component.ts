import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StarService} from '../star.service';
import {Star} from '../star.model';
import {Planet} from '../../planets/planet.model';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-star-add',
  templateUrl: './star-add.component.html',
  styleUrls: ['./star-add.component.scss']
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
      solarMass: new FormControl(null, this.numberValidator.bind(this)),
      solarRadius: new FormControl(null, this.numberValidator.bind(this)),
      effectiveTemperature: new FormControl(null, this.numberValidator.bind(this)),
      distance: new FormControl(null, this.numberValidator.bind(this)),
      planets: new FormArray([])
    });
  }

  get formArray(): FormArray {
    return this.newStarForm.get('planets') as FormArray;
  }

  get starName() {
    return this.newStarForm.get('starName');
  }

  get spectralType() {
    return this.newStarForm.get('spectralType');
  }

  get solarMass() {
    return this.newStarForm.get('solarMass');
  }

  get solarRadius() {
    return this.newStarForm.get('solarRadius');
  }

  get effectiveTemperature() {
    return this.newStarForm.get('effectiveTemperature');
  }

  get distance() {
    return this.newStarForm.get('distance');
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
  }

  onCancel() {
    this.router.navigate(['stars']);
  }

  onAddNewPlanet() {
    this.newPlanetForm = new FormGroup({
      planetName: new FormControl(null, Validators.required),
      planetClass: new FormControl(null),
      planetMass: new FormControl(null, this.numberValidator.bind(this)),
      planetRadius: new FormControl(null, this.numberValidator.bind(this)),
      planetPeriod: new FormControl(null, this.numberValidator.bind(this)),
      planetDistance: new FormControl(null, this.numberValidator.bind(this)),
      planetESI: new FormControl(null, this.numberValidator.bind(this)),
    });
    (this.newStarForm.get('planets') as FormArray).push(this.newPlanetForm);
  }

  numberValidator(control: FormControl): { [s: string]: boolean } {
    const input = String(control.value);
    if (!control.value) {
      return null;
    } else if (isNaN(Number(input))) {
      return {charsNotAllowed: true};
    } else {
      return null;
    }
  }

  removePlanetForm(planetFormGroup: FormGroup) {
    let ind = -1;
    (this.newStarForm.get('planets') as FormArray).controls.forEach((item, index) => {
      if (planetFormGroup.value.planetName === item.value.planetName) {
        ind = index;
      }
    });
    (this.newStarForm.get('planets') as FormArray).removeAt(ind);
  }
}
