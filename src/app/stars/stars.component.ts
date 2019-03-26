import {Component, OnDestroy, OnInit} from '@angular/core';
import {StarService} from './star.service';
import {Star} from './star.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css'],
})
export class StarsComponent implements OnInit, OnDestroy {

  selectedStar: Star;
  private subscription: Subscription;

  constructor(private starService: StarService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.starService.starSelected.subscribe(
      (star: Star) => {
        this.selectedStar = star;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddStar() {
    this.router.navigate(['add'], {relativeTo: this.route});
  }

  onEditStar() {
    this.router.navigate(['stars/edit/']);
  }

  onRemoveStar() {
    this.starService.removeStar(this.selectedStar);
    this.router.navigate(['stars']);
  }
}
