import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StarService} from '../star.service';
import {Star} from '../star.model';

@Component({
  selector: 'app-star-edit',
  templateUrl: './star-edit.component.html',
  styleUrls: ['./star-edit.component.css']
})
export class StarEditComponent implements OnInit {

  @ViewChild('starName') starName: ElementRef;
  @ViewChild('starClass') starClass: ElementRef;
  @ViewChild('solarMass') solarMass: ElementRef;

  constructor(private starService: StarService) {
  }

  ngOnInit() {
  }

  addToList() {
    this.starService.addStar(
      new Star(this.starName.nativeElement.value, this.starClass.nativeElement.value, this.solarMass.nativeElement.value)
    );
  }
}
