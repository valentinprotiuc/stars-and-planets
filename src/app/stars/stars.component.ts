import {Component, EventEmitter, OnInit} from '@angular/core';
import {StarService} from './star.service';
import {Star} from './star.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css'],
})
export class StarsComponent implements OnInit {

  stars: Star[] = [];
  selectedStar: Star;
  editingStar = false;

  constructor(private starService: StarService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.starService.getStars().subscribe(
      (response: Star[]) => {
        this.stars = response;
      },
      (error) => {
        console.log(error);
      });
    this.starService.starSelected.subscribe(
      (star: Star) => {
        this.selectedStar = star;
      }
    );
    this.starService.starListChanged.subscribe(
      (stars: Star[]) => {
        this.stars = stars;
      }
    );
    this.starService.editingStar.subscribe(
      (flag: boolean) => {
        this.editingStar = flag;
      }
    );
  }

  onAddStar() {
    this.router.navigate(['add'], {relativeTo: this.route});
  }

  onEditStar() {
    this.router.navigate(['stars/edit/' + this.selectedStar.name]);
  }

  onRemoveStar() {
    this.starService.removeStar(this.selectedStar);
    this.router.navigate(['stars']);
  }
}
