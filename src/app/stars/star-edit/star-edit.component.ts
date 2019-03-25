import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StarService} from '../star.service';
import {Star} from '../star.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Planet} from '../../planets/planet.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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

    this.route.params.subscribe(
      (params: Params) => {
        this.star = JSON.parse(JSON.stringify(this.starService.getStar(params.starName)));
        if (this.star) {
          this.editStarForm = new FormGroup({
            starName: new FormControl(this.star.name, Validators.required),
            starClass: new FormControl(this.star.spectralType),
            solarMass: new FormControl(this.star.solarMass),
            distance: new FormControl(this.star.distance)
          });
        }
      }
    );
  }

  onSubmit() {
    this.starService.updateStar(
      new Star(this.star.getId(), this.editStarForm.value.starName, this.editStarForm.value.starClass, this.editStarForm.value.solarMass,
        this.editStarForm.value.distance, this.star.orbitingPlanets)).subscribe(
      (response) => {
        this.starService.updateStarList();
        this.router.navigate(['stars/details/' + this.editStarForm.value.starName]);
      }, (error) => {
        console.log(error);
      });
  }

  onRemovePlanet(planet: Planet) {
    const index = this.star.orbitingPlanets.findIndex(i => i.name === planet.name);
    this.star.orbitingPlanets.splice(index, 1);
  }

  onCancel() {
    this.router.navigate(['stars']);
  }
}
