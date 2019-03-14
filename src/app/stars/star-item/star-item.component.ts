import {Component, Input, OnInit} from '@angular/core';
import {Star} from '../star.model';
import {StarService} from '../star.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-star-item',
  templateUrl: './star-item.component.html',
  styleUrls: ['./star-item.component.css']
})
export class StarItemComponent implements OnInit {

  @Input() star: Star;

  constructor(private starService: StarService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onShowStarDetails() {
    this.router.navigate(['details'], {relativeTo: this.route});
    this.starService.setLastSelectedStar(this.star);
    this.starService.starSelected.emit(this.star);
  }
}
