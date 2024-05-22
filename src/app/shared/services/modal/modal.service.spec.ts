import { TestBed } from '@angular/core/testing'

import { ModalService } from './modal.service';
import { Component, ViewContainerRef } from '@angular/core'
import { ModalComponent } from '../../components/modal/modal.component'

@Component({
  template: '<div id="text-child-label">Child Component</div>'
})
class TestChildComponent {}
describe('ModalService', () => {
  let service: ModalService;
  let viewContainerRef: ViewContainerRef;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService);

    viewContainerRef = {
      insert: (viewRef: any) => {
        document.body.appendChild(viewRef.rootNodes[0]);
      },
      indexOf: jasmine.createSpy('indexOf').and.returnValue(0),
      detach: jasmine.createSpy('detach')
    } as any;

    service.setRootViewContainerRef(viewContainerRef);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open modal and close it', () => {
    service.open(ModalComponent, TestChildComponent);

    const childComponentElement = document.getElementById('text-child-label');
    expect(childComponentElement!.textContent).toContain('Child Component');

    service.close();

    expect(viewContainerRef.detach).toHaveBeenCalled();
  });

  it('should open modal with data', () => {
    const testData = 'Test Data';

    service.open(ModalComponent, TestChildComponent, testData);

    const childComponentInstance = (service as any).childComponentRef.instance;
    expect(childComponentInstance.data).toEqual('Test Data');
  });
})
