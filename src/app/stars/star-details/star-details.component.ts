import {Component, Input, OnInit} from '@angular/core';
import {Star} from '../star.model';

@Component({
  selector: 'app-star-details',
  templateUrl: './star-details.component.html',
  styleUrls: ['./star-details.component.css']
})
export class StarDetailsComponent implements OnInit {

  @Input() selectedStar: Star;

  constructor() { }

  ngOnInit() {
  }

}
