import {TestBed, inject} from '@angular/core/testing';

import {StarService} from './star.service';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';

describe('StarService', () => {

  let authServiceStub: Partial<AuthenticationService>;
  let routerSpy: Router;

  beforeEach(() => {
    authServiceStub = {};
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      providers: [StarService, {provide: AuthenticationService, useValue: authServiceStub}, {provide: Router, useValue: routerSpy}]
    });
  });

  it('should be created', inject([StarService], (service: StarService) => {
    expect(service).toBeTruthy();
  }));
});
