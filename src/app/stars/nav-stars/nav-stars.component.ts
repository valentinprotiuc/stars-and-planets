import {Component, Input, OnInit} from '@angular/core';
import {Star} from '../star.model';

@Component({
  selector: 'app-nav-stars',
  templateUrl: './nav-stars.component.html',
  styleUrls: ['./nav-stars.component.css']
})
export class NavStarsComponent implements OnInit {

  @Input() stars: Star[];

  constructor() {
  }

  ngOnInit() {
  }

}
