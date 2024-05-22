import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService]
    });
    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data successfully if called', () => {
    const dummyData = { name: 'Test Data' };
    const endPoint = 'test-endpoint';

    service.get(endPoint).subscribe(data => {
      expect(data).toEqual(dummyData);
    });

    const url = 'https://cors-anywhere.herokuapp.com/https://ibillboard.com/api/' + endPoint;
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should handle error response', () => {
    const endPoint = 'test-endpoint';
    const errorMessage = 'mock 404 error occurred';

    service.get(endPoint).subscribe(
      () => fail('should have failed with the 404 error'),
      error => {
        expect(error.status).toEqual(404);
        expect(error.statusText).toEqual(errorMessage);
      }
    );

    const url = 'https://cors-anywhere.herokuapp.com/https://ibillboard.com/api/' + endPoint;
    const req = httpMock.expectOne(url);
    req.flush(errorMessage, { status: 404, statusText: errorMessage });
  });
});
