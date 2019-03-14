import {Component, Input, OnInit} from '@angular/core';
import {Star} from '../star.model';

@Component({
  selector: 'app-stars-nav',
  templateUrl: './stars-nav.component.html',
  styleUrls: ['./stars-nav.component.css']
})
export class StarsNavComponent implements OnInit {

  @Input() stars: Star[];

  constructor() {
  }

  ngOnInit() {
  }

}
