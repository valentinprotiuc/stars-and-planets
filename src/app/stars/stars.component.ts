import {Component, OnInit} from '@angular/core';
import {StarService} from './star.service';
import {Star} from './star.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css'],
})
export class StarsComponent implements OnInit {

  selectedStar: Star;

  constructor(private starService: StarService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.starService.starSelected.subscribe(
      (star: Star) => {
        this.selectedStar = star;
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
    console.log('The selected star: ', this.selectedStar);
    console.log('The selected star id: ', this.selectedStar.id);
    this.starService.removeStar(this.selectedStar);
    this.router.navigate(['stars']);
  }
}
