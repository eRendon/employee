import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'

import { SelectComponent } from './select.component';
import { By } from '@angular/platform-browser'
import { ElementRef } from '@angular/core'

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;
  let elementRef: ElementRef;

  beforeEach(async () => {
    elementRef = new ElementRef(document.createElement('div'));
    await TestBed.configureTestingModule({
      declarations: [SelectComponent],
      providers: [{ provide: ElementRef, useValue: elementRef }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dropdown open state', () => {
    expect(component.isOpen).toBe(false);
    component.toggleDropdown();
    expect(component.isOpen).toBe(true);
    component.toggleDropdown();
    expect(component.isOpen).toBe(false);
  });

  it('should emit selected option and close dropdown when option is clicked', () => {
    spyOn(component.onSelectOption, 'emit');
    const option = 'Option 1';
    component.onSelect(option);
    expect(component.isOpen).toBe(false);
    expect(component.onSelectOption.emit).toHaveBeenCalledWith(option);
  });

  it('should close dropdown when clicking outside', () => {
    component.isOpen = true;
    fixture.detectChanges();
    document.body.click();
    expect(component.isOpen).toBe(false);
  });

  it('should not close dropdown when clicking inside button', fakeAsync(()=> {
    component.isOpen = false;
    console.log('el componente', component)
    fixture.detectChanges();
    tick()
    const button = document.getElementById('selector-button');
    if (button) {
      console.log(component.isOpen)
      button.click();
      console.log('despues de click', component.isOpen)
      expect(component.isOpen).toBe(true);
    } else {
      console.error('Button not found');
      expect(false).toBe(true); // Fuerza que la prueba falle si el botón no se encuentra
    }
  }));

  it('should not close dropdown when clicking inside dropdown', fakeAsync(() => {
    component.isOpen = true;
    console.log('el componente', component.isOpen)
    fixture.detectChanges();
    tick()
    const dropdown = document.getElementById('ul-selector')
    if (dropdown) {
      dropdown.click();
      expect(component.isOpen).toBe(true);
    } else {
      console.error('Button not found');
      expect(false).toBe(true); // Fuerza que la prueba falle si el botón no se encuentra
    }
  }));

  it('should display correct icon when dropdown is open or closed', () => {
    component.isOpen = true;
    fixture.detectChanges();
    let icon = fixture.nativeElement.querySelector('.absolute');
    expect(icon).toBeTruthy();

    component.isOpen = false;
    fixture.detectChanges();
    icon = fixture.nativeElement.querySelector('.absolute');
    expect(icon).toBeFalsy();
  });
});
