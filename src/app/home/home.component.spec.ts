import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AuthenticationService, UserDetails} from '../authentication.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authServiceStub: Partial<AuthenticationService>;

  beforeEach(async(() => {

    authServiceStub = {
      isLoggedIn(): boolean {
        return true;
      },
      getUserDetails(): UserDetails {
        return {_id: 'id',
        email: 'mail',
        name: 'name',
        exp: 1,
        iat: 1};
      }
    };

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{provide: AuthenticationService, useValue: authServiceStub}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
