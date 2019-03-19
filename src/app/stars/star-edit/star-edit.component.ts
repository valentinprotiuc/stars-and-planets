import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StarService} from '../star.service';
import {Star} from '../star.model';
import {ActivatedRoute, Params, Router} from '@angular/router';

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

  constructor(private starService: StarService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const star = this.starService.getStar(params.starName);
        if (star) {
          this.starName.nativeElement.value = star.name;
          this.starClass.nativeElement.value = star.spectralType;
          this.solarMass.nativeElement.value = star.solarMass;
          this.distance.nativeElement.value = star.distance;
          this.starIndex = this.starService.getStarIndex(params.starName);
        }
      }
    );
  }

  onAddChanges() {
    this.starService.updateStar(
      new Star(this.starName.nativeElement.value, this.starClass.nativeElement.value, this.solarMass.nativeElement.value,
        this.distance.nativeElement.value, [])
      , this.starIndex);
    this.router.navigate(['stars/details/' + this.starName.nativeElement.value]);
  }
}
