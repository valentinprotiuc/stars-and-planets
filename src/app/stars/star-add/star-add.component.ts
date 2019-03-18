import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {StarService} from '../star.service';
import {Star} from '../star.model';

@Component({
  selector: 'app-star-add',
  templateUrl: './star-add.component.html',
  styleUrls: ['./star-add.component.css']
})
export class StarAddComponent implements OnInit {

  @ViewChild('starName') starName: ElementRef;
  @ViewChild('starClass') starClass: ElementRef;
  @ViewChild('solarMass') solarMass: ElementRef;

  constructor(private starService: StarService, private router: Router) {
  }

  ngOnInit() {
  }

  addToList() {
    this.starService.addStar(
      new Star(this.starName.nativeElement.value, this.starClass.nativeElement.value, this.solarMass.nativeElement.value, [])
    ).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
    this.router.navigate(['stars/details/' + this.starName.nativeElement.value]);
  }

}
