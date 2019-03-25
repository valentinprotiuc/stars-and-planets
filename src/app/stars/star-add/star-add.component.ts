import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StarService} from '../star.service';
import {Star} from '../star.model';
import {Planet} from '../../planets/planet.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-star-add',
  templateUrl: './star-add.component.html',
  styleUrls: ['./star-add.component.css']
})
export class StarAddComponent implements OnInit {

  newStarForm: FormGroup;

  planets: Planet[] = [];

  constructor(private starService: StarService, private router: Router) {
  }

  ngOnInit() {

    this.newStarForm = new FormGroup({
      starName: new FormControl(null, Validators.required),
      starClass: new FormControl(null),
      solarMass: new FormControl(null),
      distance: new FormControl(null)
    });
  }

  /*onAddToList() {
    const fakeId = 'fakeId';
    this.starService.addStar(
      new Star(fakeId, this.starName.nativeElement.value, this.starClass.nativeElement.value, this.solarMass.nativeElement.value,
        this.distance.nativeElement.value, this.planets)
    ).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    console.log('Came back');
    this.starService.updateStarList();
    this.planets = [];
    console.log('Flying away');
    this.router.navigate(['stars/details/' + this.starName.nativeElement.value]);
  }

  onCancel() {
    this.planets = [];
    this.router.navigate(['stars']);
  }*/

  /*onAddPlanet() {
    this.planets.push(new Planet(this.planetName.nativeElement.value, this.planetMass.nativeElement.value));
    this.planetName.nativeElement.value = null;
    this.planetMass.nativeElement.value = null;
  }*/

  onSubmit() {

    this.starService.addStar(
      new Star('fakeId', this.newStarForm.value.starName, this.newStarForm.value.starClass, this.newStarForm.value.solarMass,
        this.newStarForm.value.distance, this.planets)
    ).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    console.log('Came back');
    this.starService.updateStarList();
    this.planets = [];
    console.log('Flying away');
    this.router.navigate(['stars/details/' + this.newStarForm.value.starName]);
  }
}
