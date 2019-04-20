import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileComponent} from './profile.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let authServiceStub: Partial<AuthenticationService>;
  let authService: AuthenticationService;
  let routerSpy: Router;
  let el;

  beforeEach(async(() => {

    authServiceStub = {
      profile() {
        return new Observable((observer) => {
          observer.next({name: 'Test User', email: 'test@testmail.com'});
          observer.complete();
        });
      }
    };

    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{provide: AuthenticationService, useValue: authServiceStub}, {provide: Router, useValue: routerSpy}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    authService = fixture.debugElement.injector.get(AuthenticationService);
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user data', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain('Test User');
    expect(el.textContent).toContain('test@testmail.com');
  });
});
