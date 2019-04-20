import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StarItemComponent} from './star-item.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StarService} from '../star.service';
import {Star} from '../star.model';

describe('StarItemComponent', () => {
  let component: StarItemComponent;
  let fixture: ComponentFixture<StarItemComponent>;
  let starServiceStub: Partial<StarService>;
  let routerSpy: Router;
  let activatedRouteStub: Partial<ActivatedRoute>;

  beforeEach(async(() => {
    activatedRouteStub = {};
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    starServiceStub = {};
    TestBed.configureTestingModule({
      declarations: [StarItemComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{provide: ActivatedRoute, useValue: activatedRouteStub}, {provide: StarService, useValue: starServiceStub}, {provide: Router, useValue: routerSpy}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarItemComponent);
    component = fixture.componentInstance;
    component.star = new Star(
      'test_id',
      'test_name',
      'test_type',
      2,
      2,
      2,
      2,
      []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
