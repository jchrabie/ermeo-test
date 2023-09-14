import { Directive, HostBinding, Input } from '@angular/core';
import { CLASS_TYPE, ClassType } from '../model';

@Directive({
  selector: '[appColorItem]',
  standalone: true,
})
export class ColorItemDirective {
  @HostBinding('class') get columnClass(): ClassType {
    if (!this.value) {
      return CLASS_TYPE.DEFAULT;
    }

    if (!(this.value % 3)) {
      if (!(this.value % 5)) {
        return CLASS_TYPE.WARNING;
      }

      return CLASS_TYPE.SUCCESS;
    }

    if (!(this.value % 5)) {
      return CLASS_TYPE.INFO;
    }

    return CLASS_TYPE.ERROR;
  }

  @Input() value!: number;
}
