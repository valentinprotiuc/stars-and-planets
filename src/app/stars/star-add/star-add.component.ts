import {Component, Input, OnInit} from '@angular/core';
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

  @Input() showNewPlanterForm = false;

  newStarForm: FormGroup;

  planets: Planet[] = [];

  constructor(private starService: StarService, private router: Router) {
  }

  ngOnInit() {

    this.newStarForm = new FormGroup({
      starName: new FormControl(null, Validators.required),
      starClass: new FormControl(null),
      solarMass: new FormControl(null),
      distance: new FormControl(null),
      newPlanetFormGroup: new FormGroup({
        planetName: new FormControl(null),
        planetMass: new FormControl(null)
      })
    });
  }

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
    /* The reason the update is called here is the strange behaviour of mlab, which responds with a syntax error although the data is
    save correctly to the DB and as a result the next function of subscribe is never called
    */
    this.starService.updateStarList();
    this.planets = [];
    this.router.navigate(['stars/details/' + this.newStarForm.value.starName]);
  }

  onAddPlanet() {
    this.planets.push(new Planet(this.newStarForm.value.planetName, this.newStarForm.value.planetMass));
    this.newStarForm.patchValue({
      planetName: '',
      planetMass: ''
    });
  }

  onCancel() {
    this.planets = [];
    this.router.navigate(['stars']);
  }

  onRemovePlanet(planet: Planet) {
    const index = this.planets.findIndex(i => i.name === planet.name);
    this.planets.splice(index, 1);
  }
}
