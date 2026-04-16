import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appSlide]',
  standalone: true
})
export class SlideDirective {
  constructor(public template: TemplateRef<any>) {}
}
