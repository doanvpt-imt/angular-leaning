import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[numbersOnly]',
  standalone: true,
})
export class NumberOnlyDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    const initValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initValue.replace(/[^0-9]*/g, '');
    if (initValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
