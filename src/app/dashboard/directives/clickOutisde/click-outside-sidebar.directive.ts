import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutsideSidebar]',
  standalone: true
})
export class ClickOutsideSidebarDirective {

  @Output() clickOutside = new EventEmitter<MouseEvent>();

  constructor(private el: ElementRef) { }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.clickOutside.emit(event);
    }
  }

}
