import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {StarService} from '../star.service';
import {Star} from '../star.model';
import {Planet} from '../../planets/planet.model';

@Component({
  selector: 'app-star-add',
  templateUrl: './star-add.component.html',
  styleUrls: ['./star-add.component.css']
})
export class StarAddComponent implements OnInit {

  @ViewChild('starName') starName: ElementRef;
  @ViewChild('starClass') starClass: ElementRef;
  @ViewChild('solarMass') solarMass: ElementRef;
  @ViewChild('distance') distance: ElementRef;
  @ViewChild('planetName') planetName: ElementRef;
  @ViewChild('planetMass') planetMass: ElementRef;

  planets: Planet[];

  constructor(private starService: StarService, private router: Router) {
  }

  ngOnInit() {
  }

  onAddToList() {
    this.starService.addStar(
      new Star(this.starName.nativeElement.value, this.starClass.nativeElement.value, this.solarMass.nativeElement.value,
        this.distance.nativeElement.value, [])
    ).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
    this.router.navigate(['stars/details/' + this.starName.nativeElement.value]);
  }

  onCancel() {
    this.router.navigate(['stars']);
  }

  onAddPlanet() {
    this.planets.push(new Planet(this.planetName.nativeElement.value, this.planetMass.nativeElement.value));
    this.planetName.nativeElement.value = null;
    this.planetMass.nativeElement.value = null;
  }
}
