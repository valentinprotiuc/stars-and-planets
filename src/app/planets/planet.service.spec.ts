import {TestBed, inject} from '@angular/core/testing';

import {PlanetService} from './planet.service';
import {HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';

describe('PlanetService', () => {

  let routerSpy: Router;

  beforeEach(() => {

    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      providers: [PlanetService, {provide: Router, useValue: routerSpy}],
      imports: [HttpClientModule],
    });
  });

  it('should be created', inject([PlanetService], (service: PlanetService) => {
    expect(service).toBeTruthy();
  }));
});
