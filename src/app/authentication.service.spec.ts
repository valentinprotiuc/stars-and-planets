import {TestBed, inject} from '@angular/core/testing';

import {AuthenticationService} from './authentication.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {Data} from '@angular/router';

describe('AuthenticationService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService],
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));

  it('can test AuthenticationService.get', () => {

    const testData: Data = {name: 'Test Data'};
    const testUrl = '/api/getData';

    httpClient.get<Data>(testUrl).subscribe(data => expect(data).toEqual(testData));

    const req = httpTestingController.expectOne(testUrl);

    expect(req.request.method).toEqual('GET');

    req.flush(testData);

    httpTestingController.verify();
  });

  it('can test AuthenticationService.put', () => {

    const testData: Data = {name: 'Test Data'};
    const testUrl = '/api/addData';

    httpClient.put<Data>(testUrl, testData, {headers: {Authorization: `Bearer`}}).subscribe(data => expect(data).toEqual(testData));

    const req = httpTestingController.expectOne(testUrl);

    expect(req.request.method).toEqual('PUT');

    req.flush(testData);

    httpTestingController.verify();
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
});
