import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StarsWelcomeComponent} from './stars-welcome.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AuthenticationService} from '../../authentication.service';


describe('StarsWelcomeComponent', () => {
  let component: StarsWelcomeComponent;
  let fixture: ComponentFixture<StarsWelcomeComponent>;
  let authService: Partial<AuthenticationService>;

  beforeEach(async(() => {
    authService = {
      isLoggedIn(): boolean {
        return false;
      }
    };
    TestBed.configureTestingModule({
      declarations: [StarsWelcomeComponent],
      providers: [{provide: AuthenticationService, useValue: authService}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(StarsWelcomeComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthenticationService);
  }));

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should greet logged in users', () => {
    fixture.detectChanges();
    const welcomeElement: HTMLElement = fixture.nativeElement;
    expect(welcomeElement.textContent).toContain('');
  });
});
