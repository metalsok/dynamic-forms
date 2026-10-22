import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {DynamicBaseClass, dynamicControlProvider} from '../dynamic-base.class';

@Component({
  selector: 'app-dynamic-number-control',
  imports: [ReactiveFormsModule],
  viewProviders: [dynamicControlProvider],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <label class="block text-gray-700 text-sm font-bold mb-2"
           [for]="controlKey()">{{ config().label }}</label>
    <input
      type="number"
      [formControlName]="controlKey()"
      [id]="controlKey()"
      [min]="config().min ?? null"
      [max]="config().max ?? null"
      [step]="config().step ?? 1"
      [placeholder]="config().placeholder ?? ''"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    >
  `,
})
export class DynamicNumber extends DynamicBaseClass {}
