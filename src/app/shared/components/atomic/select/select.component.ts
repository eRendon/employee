import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core'

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input() options: string[] = []
  @Input() selectedOption?: string = 'Seleccione una opción'
  @Output() onSelectOption:EventEmitter<string> = new EventEmitter<string>()
  constructor (private elementRef: ElementRef) {}
  isOpen: boolean = false

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onSelect(value: string): void {
    this.isOpen = false
    this.onSelectOption.emit(value)
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    const button = this.elementRef.nativeElement.querySelector('button');
    const dropdown = this.elementRef.nativeElement.querySelector('.absolute');

    if (dropdown && !button.contains(target) && !dropdown.contains(target)) {
      this.isOpen = false;
    }
  }
}
