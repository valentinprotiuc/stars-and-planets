import {Component, OnDestroy, OnInit} from '@angular/core';
import {StarService} from '../star.service';
import {Star} from '../star.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Planet} from '../../planets/planet.model';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-star-edit',
  templateUrl: './star-edit.component.html',
  styleUrls: ['./star-edit.component.scss']
})
export class StarEditComponent implements OnInit, OnDestroy {

  star: Star;
  editStarForm: FormGroup;
  newPlanetForm: FormGroup;
  private subscription: Subscription;

  constructor(private starService: StarService, private router: Router, private route: ActivatedRoute) {
  }

  get formArray(): FormArray {
    return this.editStarForm.get('planets') as FormArray;
  }

  get starName() {
    return this.editStarForm.get('starName');
  }

  get spectralType() {
    return this.editStarForm.get('spectralType');
  }

  get solarMass() {
    return this.editStarForm.get('solarMass');
  }

  get solarRadius() {
    return this.editStarForm.get('solarRadius');
  }

  get effectiveTemperature() {
    return this.editStarForm.get('effectiveTemperature');
  }

  get distance() {
    return this.editStarForm.get('distance');
  }

  prePopulate() {
    this.editStarForm = new FormGroup({
      starName: new FormControl(this.star.name, Validators.required),
      spectralType: new FormControl(this.star.spectralType),
      solarMass: new FormControl(this.star.solarMass, this.numberValidator.bind(this)),
      solarRadius: new FormControl(this.star.solarRadius, this.numberValidator.bind(this)),
      effectiveTemperature: new FormControl(this.star.effectiveTemperature, this.numberValidator.bind(this)),
      distance: new FormControl(this.star.distance, this.numberValidator.bind(this)),
      planets: new FormArray([])
    });
  }

  onSubmit() {

    this.editStarForm.value.planets.forEach((planet) => {
      this.star.orbitingPlanets.push(planet as Planet);
    });
    this.star.name = this.editStarForm.value.starName;
    this.star.spectralType = this.editStarForm.value.spectralType;
    this.star.solarMass = this.editStarForm.value.solarMass;
    this.star.solarRadius = this.editStarForm.value.solarRadius;
    this.star.effectiveTemperature = this.editStarForm.value.effectiveTemperature;
    this.star.distance = this.editStarForm.value.distance;
    this.starService.updateStar(this.star);
  }

  onRemovePlanet(planet: Planet) {
    const index = this.star.orbitingPlanets.findIndex(i => i.planetName === planet.planetName);
    this.star.orbitingPlanets.splice(index, 1);
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
    (this.editStarForm.get('planets') as FormArray).push(this.newPlanetForm);
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

  ngOnInit() {

    this.star = this.starService.currentlySelectedStar;
    this.subscription = this.starService.starSelected.subscribe(
      (star: Star) => {
        this.star = star;
        this.prePopulate();
      },
      (error) => {
        throw error;
      }
    );

    this.prePopulate();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removePlanetForm(planetFormGroup: FormGroup) {
    let ind = -1;
    (this.editStarForm.get('planets') as FormArray).controls.forEach((item, index) => {
      if (planetFormGroup.value.planetName === item.value.planetName) {
        ind = index;
      }
    });
    (this.editStarForm.get('planets') as FormArray).removeAt(ind);
  }
}
