import { fakeAsync, TestBed, tick } from '@angular/core/testing'

import { AlertService } from './alert.service';
import { IAlert } from '../../../interfaces/IAlert'

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should emit an error message', (done) => {

    service.getAlerts().subscribe((alert: IAlert) => {
      expect(alert.type).toBe('error');
      expect(alert.message).toBe('Error message');
      done();
    });

    service.error('Error message');

  });

  it('should clear the alert after timeout', (done) => {


    service.getAlerts().subscribe((alert: IAlert) => {
      if (alert.message === '') {
        expect(alert.type).toBe('');
        expect(alert.message).toBe('');
        done();
      }
    });

    service.success('Temporary success message');

    setTimeout(() => {

    }, 3000)

  });

  it('should clear the alert manually', (done) => {

    service.getAlerts().subscribe((alert: IAlert) => {
      if (alert.message === '') {
        expect(alert.type).toBe('');
        expect(alert.message).toBe('');
        done();
      }
    });

    service.success('Success message');
    service.clear();

  });

  it('should update currentMessage when new success message is added while one is active', () => {
    service.success('First message');
    expect(service['currentMessage']).toBe('First message');
    service.success('Second message');
    expect(service['currentMessage']).toBe('Second message');
  });

  it('should reset currentMessage to null after clear', () => {
    service.success('Message');
    service.clear();
    expect(service['currentMessage']).toBeNull();
  });
});
