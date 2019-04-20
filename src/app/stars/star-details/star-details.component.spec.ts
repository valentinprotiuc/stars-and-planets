import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StarDetailsComponent} from './star-details.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {StarService} from '../star.service';
import {PlanetService} from '../../planets/planet.service';
import {Router} from '@angular/router';
import {Star} from '../star.model';
import {Observable, Subject} from 'rxjs';

describe('StarDetailsComponent', () => {
  let component: StarDetailsComponent;
  let fixture: ComponentFixture<StarDetailsComponent>;
  let starServiceStub: Partial<StarService>;
  let planetServiceStub: Partial<PlanetService>;
  let routerSpy: Router;

  beforeEach(async(() => {
    starServiceStub = {
      get currentlySelectedStar(): Star {
        return new Star('test_id', 'test_name', 'test_type', 1, 1, 1, 1, []);
      },
      starSelected: new Subject<Star>()
    };
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    planetServiceStub = {};
    TestBed.configureTestingModule({
      declarations: [StarDetailsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{provide: StarService, useValue: starServiceStub},
        {provide: PlanetService, useValue: planetServiceStub},
        {provide: Router, useValue: routerSpy}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
