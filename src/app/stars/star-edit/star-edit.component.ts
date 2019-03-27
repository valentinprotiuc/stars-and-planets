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
  styleUrls: ['./star-edit.component.css']
})
export class StarEditComponent implements OnInit, OnDestroy {

  star: Star;
  editStarForm: FormGroup;
  private subscription: Subscription;

  constructor(private starService: StarService, private router: Router, private route: ActivatedRoute) {
  }

  prePopulate() {
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

    const initialName = this.starService.currentlySelectedStar.name;
    this.star.name = this.editStarForm.value.starName;
    this.star.spectralType = this.editStarForm.value.spectralType;
    this.star.solarMass = this.editStarForm.value.solarMass;
    this.star.solarRadius = this.editStarForm.value.solarRadius;
    this.star.effectiveTemperature = this.editStarForm.value.effectiveTemperature;
    this.star.distance = this.editStarForm.value.distance;
    this.starService.updateStar(this.star, initialName);
    this.router.navigate(['stars/details']);
  }

  onRemovePlanet(planet: Planet) {
    const index = this.star.orbitingPlanets.findIndex(i => i.planetName === planet.planetName);
    this.star.orbitingPlanets.splice(index, 1);
  }

  onCancel() {
    this.router.navigate(['stars']);
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
}
