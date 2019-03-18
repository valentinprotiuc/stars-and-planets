import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ServerService {
  constructor(private http: HttpClient) {
  }

  getStarsFromDB() {
    return this.http.get('https://stars-and-planets.herokuapp.com/data');
  }
}
