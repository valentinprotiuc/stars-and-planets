import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StarsNavComponent} from './stars-nav.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {StarService} from '../star.service';
import {Subject} from 'rxjs';
import {Star} from '../star.model';

describe('StarsNavComponent', () => {
  let component: StarsNavComponent;
  let fixture: ComponentFixture<StarsNavComponent>;
  let starServiceStub: Partial<StarService>;

  beforeEach(async(() => {
    starServiceStub = {
      starListChanged: new Subject<Star[]>(),
      getStarList() {
        this.starListChanged.next(
          [new Star(
            'test_id',
            'test_name',
            'test_type',
            2,
            2,
            2,
            2,
            [])]
        );
      }
    };
    TestBed.configureTestingModule({
      declarations: [StarsNavComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{provide: StarService, useValue: starServiceStub}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
