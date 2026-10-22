import {Component} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {DynamicBaseClass, dynamicControlProvider} from '../dynamic-base.class';

@Component({
  selector: 'app-dynamic-radio-control',
  imports: [ReactiveFormsModule],
  viewProviders: [dynamicControlProvider],
  template: `
    <fieldset class="mb-2">
      <legend class="block text-gray-700 text-sm font-bold mb-2">{{ config().label }}</legend>
      @for (option of config().options; track option.value; let index = $index) {
        <div class="flex items-center gap-2 mb-2">
          <input
            type="radio"
            [formControlName]="controlKey()"
            [id]="controlKey() + '-' + index"
            [value]="option.value"
          >
          <label class="text-gray-700" [for]="controlKey() + '-' + index">{{ option.label }}</label>
        </div>
      }
    </fieldset>
  `,
})
export class DynamicRadio extends DynamicBaseClass {}
