import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StarEditComponent} from './star-edit.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {StarService} from '../star.service';
import {Router} from '@angular/router';
import {PlanetService} from '../../planets/planet.service';
import {Star} from '../star.model';
import {Subject} from 'rxjs';

describe('StarEditComponent', () => {
  let component: StarEditComponent;
  let fixture: ComponentFixture<StarEditComponent>;
  let starServiceStub: Partial<StarService>;
  let routerSpy: Router;

  beforeEach(async(() => {
    starServiceStub = {
      get currentlySelectedStar(): Star {
        return new Star('test_id', 'test_name', 'test_type', 1, 1, 1, 1, []);
      },
      starSelected: new Subject<Star>()
    };
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      declarations: [StarEditComponent],
      imports: [ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{provide: StarService, useValue: starServiceStub}, {provide: Router, useValue: routerSpy}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
