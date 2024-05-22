import { ComponentFixture, TestBed } from '@angular/core/testing'

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

    // Creamos un mock de ViewContainerRef
    viewContainerRef = {
      insert: (viewRef: any) => {
        // Simulamos la inserción del componente en el DOM
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
    // Abrimos el modal
    service.open(ModalComponent, TestChildComponent);

    // Comprobamos que el modal se haya insertado en el DOM
    const childComponentElement = document.getElementById('text-child-label');
    console.log(childComponentElement)
    expect(childComponentElement!.textContent).toContain('Child Component');

    // Cerramos el modal
    service.close();

    // Comprobamos que el modal se haya desvinculado del DOM
    expect(viewContainerRef.detach).toHaveBeenCalled();
  });

  it('should open modal with data', () => {
    // Datos para pasar al componente hijo
    const testData = { message: 'Test Data' };

    // Abrimos el modal con datos
    service.open(ModalComponent, TestChildComponent, testData);

    // Accedemos al último componente hijo creado
    const childComponentInstance = (service as any).childComponentRef.instance;
    expect(childComponentInstance.message).toEqual('Test Data');
  });
})
