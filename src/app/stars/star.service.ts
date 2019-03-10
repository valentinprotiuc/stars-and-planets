import { Injectable } from '@angular/core';
import {Star} from './star.model';

@Injectable({
  providedIn: 'root'
})
export class StarService {

  private stars: Star[] = [
    new Star('Sonne', 'Gelber Zwerg', 1),
    new Star('Alpha Centauri A', 'Gelber Zwerg', 1.1),
    new Star('Alpha Centauri B', 'Oranger Zwerg', 0.93),
    new Star('Proxima Centauri', 'Roter Zwerg', 0.12)

  ];

  getStars(){
    return this.stars.slice();
  }

  constructor() { }
}
