import {Component} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {DynamicBaseClass, dynamicControlProvider} from '../dynamic-base.class';

@Component({
  selector: 'app-dynamic-input-control',
  imports: [ReactiveFormsModule],
  viewProviders: [dynamicControlProvider],
  template: `
    <label class="block text-gray-700 text-sm font-bold mb-2"
           [for]="controlKey()">{{ config().label }}</label>
    <input
      [formControlName]="controlKey()"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      [type]="config().type" [id]="controlKey()" [value]="config().value">
  `
})
export class DynamicInput extends DynamicBaseClass {
}
