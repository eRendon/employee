import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ModalService } from '../../services/modal/modal.service'

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let modalServiceSpy: jasmine.SpyObj<ModalService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ModalService', ['close']);

    TestBed.configureTestingModule({
      declarations: [ ModalComponent ],
      providers: [
        { provide: ModalService, useValue: spy }
      ],
      imports: [BrowserAnimationsModule]
    });
    // Crear el componente ModalComponent
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    // Obtener el servicio ModalService del TestBed
    modalServiceSpy = TestBed.inject(ModalService) as jasmine.SpyObj<ModalService>;
    // Detectar cambios
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close modal when Escape key is pressed', () => {
    // Disparar el evento 'keydown' en el documento para simular la tecla Escape presionada
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);

    // Verificar que el método close del servicio ModalService se haya llamado
    expect(modalServiceSpy.close).toHaveBeenCalled();
  });
});
