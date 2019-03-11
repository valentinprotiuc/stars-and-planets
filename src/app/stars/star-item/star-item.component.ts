import {Component, Input, OnInit} from '@angular/core';
import {Star} from '../star.model';
import {StarService} from '../star.service';

@Component({
  selector: 'app-star-item',
  templateUrl: './star-item.component.html',
  styleUrls: ['./star-item.component.css']
})
export class StarItemComponent implements OnInit {

  @Input() star: Star;

  constructor(private starService: StarService) { }

  ngOnInit() {
  }

  showStarDetails() {
    this.starService.starSelected.emit(this.star);
  }
}
