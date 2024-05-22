import { TestBed } from '@angular/core/testing';

import { PositionsService } from './positions.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { HttpService } from '../../http/http.service'
import { HttpClient } from '@angular/common/http'

describe('PositionsService', () => {
  let service: PositionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService, HttpClient]
    });
    service = TestBed.inject(PositionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
