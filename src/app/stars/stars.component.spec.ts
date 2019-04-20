import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StarsComponent} from './stars.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {StarService} from './star.service';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {Subject} from 'rxjs';
import {Star} from './star.model';

describe('StarsComponent', () => {
  let component: StarsComponent;
  let fixture: ComponentFixture<StarsComponent>;
  let authServiceStub: Partial<AuthenticationService>;
  let starServiceStub: Partial<StarService>;
  let routerSpy: Router;
  let activatedRouteStub: Partial<ActivatedRoute>;

  beforeEach(async(() => {
    activatedRouteStub = {};
    authServiceStub = {
      isLoggedIn(): boolean {
        return true;
      }
    };
    starServiceStub = {starSelected: new Subject<Star>()};
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      declarations: [StarsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [MDBBootstrapModule.forRoot()],
      providers: [{provide: ActivatedRoute, useValue: activatedRouteStub}, {
        provide: AuthenticationService,
        useValue: authServiceStub
      }, {provide: Router, useValue: routerSpy},
        {provide: StarService, useValue: starServiceStub}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
