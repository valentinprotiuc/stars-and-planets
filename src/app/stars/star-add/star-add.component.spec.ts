import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StarAddComponent} from './star-add.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {StarService} from '../star.service';
import {Router} from '@angular/router';

describe('StarAddComponent', () => {
  let component: StarAddComponent;
  let fixture: ComponentFixture<StarAddComponent>;
  let starServiceStub: Partial<StarService>;
  let routerSpy: Router;

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    starServiceStub = {};
    TestBed.configureTestingModule({
      declarations: [StarAddComponent],
      imports: [ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{provide: StarService, useValue: starServiceStub}, {provide: Router, useValue: routerSpy}]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
