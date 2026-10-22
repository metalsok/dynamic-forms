import {Component, ChangeDetectionStrategy} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DynamicBaseClass, dynamicControlProvider} from '../dynamic-base.class';

@Component({
  selector: 'app-dynamic-select-control',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  viewProviders: [dynamicControlProvider],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <label class="block text-gray-700 text-sm font-bold mb-2"
           [for]="controlKey()">{{ config().label }}</label>
    <select [formControlName]="controlKey()"
            [id]="controlKey()"
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
      @for (option of config().options; track option.label) {
        <option [value]="option.value">{{ option.label }}</option>
      }
    </select>
  `,

})
export class DynamicSelect extends DynamicBaseClass {
}
