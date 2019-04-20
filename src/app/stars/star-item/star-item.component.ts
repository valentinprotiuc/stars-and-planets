import {Component, Input, OnInit} from '@angular/core';
import {Star} from '../star.model';
import {StarService} from '../star.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-star-item',
  templateUrl: './star-item.component.html',
  styleUrls: ['./star-item.component.scss']
})
export class StarItemComponent implements OnInit {

  @Input() star: Star;

  constructor(private starService: StarService, private router: Router) {
  }

  ngOnInit() {
  }

  onShowStarDetails() {
    this.starService.currentlySelectedStar = this.star;
    this.starService.starSelected.next(this.star);
    this.router.navigate(['details']);
  }
}
